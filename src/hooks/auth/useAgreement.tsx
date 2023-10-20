import { AxiosError } from "axios"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { signUpValuesStore } from "src/stores/member-store/types/signup-values-store"
import { useUserStore } from "src/stores/user-store/userStore"
import { AuthResponse, ServerErrorResponse } from "src/types/apiResponse"
import axiosInstance from "src/utils/httpClient"

type agreementsType = {
  [key: string]: boolean
  serviceAgree: boolean
  personalInfoAgree: boolean
  ageAgree: boolean
  eventAgree: boolean
}

const useAgreement = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [serverError, setServerError] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [allAgree, setAllAgree] = useState(false)
  const [agree, setAgree] = useState({
    serviceAgree: false,
    personalInfoAgree: false,
    ageAgree: false,
    eventAgree: false,
  })
  const { setUser, setAccessToken, setRefreshToken } = useUserStore.getState()
  const router = useRouter()

  const handleAgreeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setAgree((prevAgree) => ({ ...prevAgree, [name]: checked }))
    const allChecked = Object.values({ ...agree, [name]: checked }).every((value) => value === true)
    setAllAgree(allChecked)
  }

  const handleAllAgreementCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    const newAgreements = Object.keys(agree).reduce((newAgree, agreeKey) => {
      newAgree[agreeKey] = checked
      return newAgree
    }, {} as agreementsType)
    setAgree(newAgreements)
    setAllAgree(checked)
  }

  const { email, nickname, password, confirmpassword, role, notification } = signUpValuesStore()

  const handleSubmit = async () => {
    // e.preventDefault()
    const userInfo = {
      email,
      password,
      nickname,
      notification: agree.eventAgree,
      role,
    }

    if (agree.serviceAgree && agree.personalInfoAgree && agree.ageAgree) {
      setError(null)
      setIsLoading(true)

      try {
        const reponse = await axiosInstance.post("/auth/signup", userInfo)
        const { user, accessToken, refreshToken } = reponse.data
        setUser(user)
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)
        // setCookieStorageValue("user", JSON.stringify(user))
        router.replace(typeof router.query.next === "string" ? router.query.next : "/")
      } catch (error) {
        // 서버에러
        console.log("error", error)
        const axiosError = error as AxiosError<ServerErrorResponse>
        setServerError(axiosError.response?.data.message || "관리자에게 문의해주세요.")
      } finally {
        setIsLoading(false)
      }
    } else {
      setError("모든 필수 항목을 체크해주세요")
    }
  }

  return {
    allAgree,
    agree,
    handleAgreeCheck,
    handleAllAgreementCheck,
    handleSubmit,
    error,
    isLoading,
    serverError,
  }
}

const mockResolve = async () => {
  return await new Promise<{ data: AuthResponse }>((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          user: {
            nickname: "user123",
            email: "user123@example.com",
            password: "Aa12345",
            confirmpassword: "Aa12345",
            notification: false,
            role: "user",
          },
          accessToken: "fake-access-token",
          refreshToken: "fake-refresh-token",
        },
      })
    }, 2000) // 1초 지연
  })
}

const mockReject = async () => {
  await new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Authentication failed"))
    }, 1000) // 1초 지연
  })
}

export default useAgreement
