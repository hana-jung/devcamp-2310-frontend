import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { v4 as uuidv4 } from "uuid"
import { MAX_RETRY_COUNT, TIMEOUT } from "../config/authConfig"
import { API_BASE_URL, AUTH_REFRESH } from "../constants/apiEndpoints"
import { RETRY_TTL } from "../constants/network"
import { useUserStore } from "../stores/userStore"
import { TokenRefreshResponse } from "../types/apiResponse"

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
})

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken")
  config.headers.Authorization = token ? `Bearer ${token}` : ""

  const reqId = uuidv4()
  config.headers["X-Request-ID"] = reqId

  retryCountMap.set(reqId, { count: 0, timestamp: Date.now() })

  return config
})

const retryCountMap = new Map<string, { count: number; timestamp: number }>()

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const reqId = response.config.headers["X-Request-ID"]
    retryCountMap.delete(reqId)
    return response
  },
  async (error: AxiosError) => {
    const reqId = error.config?.headers["X-Request-ID"]
    const { count: currentRetryCount, timestamp } = retryCountMap.get(reqId) || { count: 0, timestamp: Date.now() }
    if (error.response?.status === 401 && currentRetryCount < MAX_RETRY_COUNT) {
      retryCountMap.set(reqId, { count: currentRetryCount + 1, timestamp })
      const { logout, refreshToken, setAccessToken } = useUserStore.getState()
      return refreshTokenAndRetry(error, { logout, refreshToken, setAccessToken })
    }

    return Promise.reject(error)
  }
)

const refreshTokenAndRetry = async (
  error: AxiosError,
  { logout, refreshToken, setAccessToken }: StoreActions
): Promise<AxiosResponse | undefined> => {
  const reqId = error.config?.headers["X-Request-ID"] || ""

  if (refreshToken) {
    try {
      const { data } = await axiosInstance.post<TokenRefreshResponse>(AUTH_REFRESH, { token: refreshToken })

      setAccessToken(data.accessToken)
      if (error.config) {
        error.config.headers.Authorization = `Bearer ${data.accessToken}`
        return axiosInstance.request(error.config)
      }
    } catch (e) {
      logout()
      if (e instanceof Error) {
        console.error(`[reqId: ${reqId}] Refresh token failed: ${e.message} (Error Code: ${e.name || "UNKNOWN"})`)
        return Promise.reject(new Error(`Refresh token failed: ${e.message}`))
      } else {
        console.error(`[reqId: ${reqId}] An unknown error occurred.`)
        return Promise.reject(new Error("An unknown error occurred."))
      }
    }
  }

  logout()
  return Promise.reject(new Error(`[reqId: ${reqId}] No refresh token available`))
}

type StoreActions = {
  logout: () => void
  refreshToken: string | null
  setAccessToken: (token: string) => void
}

const cleanUpRetryMap = () => {
  const now = Date.now()
  for (const [reqId, { timestamp }] of retryCountMap.entries()) {
    if (now - timestamp > RETRY_TTL) {
      retryCountMap.delete(reqId)
    }
  }
}

setInterval(cleanUpRetryMap, 5000)

export default axiosInstance
