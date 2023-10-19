import { AxiosResponse } from "axios"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { loginInstance } from "src/axios/axios"
import { useUserStore } from "src/stores/user-store/userStore"
import { loginAuthResponse } from "src/types/apiResponse"

const useLogin = () => {
  //로그인 로직 훅으로 뺼 예정임
  const router = useRouter()

  const [loginValues, setValues] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState({
    email: "",
    password: "",
  })

  const { setAccessToken, setRefreshToken, setUser } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)

  console.log("loginValues", loginValues)
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({ ...loginValues, [name]: value })
    setError({ ...error, [name]: "" })
  }

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = { email: "", password: "" }

    if (!loginValues.email) {
      errors.email = "이메일이 일치하지 않습니다"
    }
    // 여기서 이메일 유효성 검사 로직을 추가할 수 있습니다.

    if (!loginValues.password) {
      errors.password = "비밀번호가 일치하지 않습니다"
    }
    // 여기서 비밀번호 유효성 검사 로직을 추가할 수 있습니다.

    setError(errors)

    if (errors.email || errors.password) {
      setError(errors)
      setIsLoading(true)
    } else {
      // setError()
      // 에러 없애봅시다
      setIsLoading(true)
      try {
        const response: AxiosResponse<loginAuthResponse> = await loginInstance.post("/auth/login", loginValues)
        const { accessToken, refreshToken, user } = response.data
        setUser(user)
        // setAccessToken(accessToken)
        // setRefreshToken(refreshToken)
        router.replace(typeof router.query.next === "string" ? router.query.next : "/")
      } catch (error) {
        // 서버에러
      } finally {
        setIsLoading(false)
      }
    }
  }

  return { onChangeHandler, onSubmitHandler, loginValues, setValues, error, setError, isLoading, setIsLoading }
}

export default useLogin
