import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { v4 as uuidv4 } from "uuid"
import { env } from "env.mjs"

// const router = useRouter()
type Tokens = {
  authorization: string
  "authorization-refresh": string
}

export const instance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
})

instance.interceptors.request.use((config) => {
  const reqId = uuidv4()
  config.headers["x-request-id"] = reqId
  const token = Cookies.get("accessToken")
  config.headers.Authorization = token ? `Bearer ${token}` : ""
  return config
})

instance.interceptors.response.use(
  function (response) {
    // 값이 정상적으로 들어왔을 때(200번대 응답)
    console.log("성공")
    return response
  },

  async function (error) {
    if (error.response) {
      // 에러일 경우 처리(이미 가입한 회원)
      // ("/member-redirect")로 이동해야함

      console.log("에러입니다")
    }

    return Promise.reject(error)
  }
)

export const loginInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
})

loginInstance.interceptors.request.use((config) => {
  // const token = Cookies.get("accessToken")
  const reqId = uuidv4()
  config.headers["x-request-id"] = reqId

  return config
})

loginInstance.interceptors.response.use(
  function (response) {
    // 값이 정상적으로 들어왔을 때(200번대 응답)
    if (response.data.accessToken) {
      Cookies.set("accessToken", response.data.accessToken)
    }
    if (response.data.refreshToken) {
      Cookies.set("refreshToken", response.data.refreshToken)
    }
    console.log("성공")
    return response
  },

  async function (error) {
    if (error.response) {
      // 에러일 경우 처리(200번대 응답이 아닐 경우)
      // router.push("/member-redirect")
      //
      console.log("이미 가입")
      return
    }

    //if(엑세스 토큰이 없을 때 혹은 만료되었을 때 )

    return Promise.reject(error)
  }
)
