import { AxiosError } from "axios"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import { useMemberStore } from "src/stores/member-store/memberStore"
import { SignupValuesState, signUpValuesStore } from "src/stores/member-store/types/signup-values-store"
import { AuthenticationResponse, ServerErrorResponse } from "src/types/apiResponse"
import { emailPattern, passwordPattern } from "src/utils/validationPatterns"

const useRegisterAuthForm = () => {
  const router = useRouter()
  const [snsToggle, setSnsToggle] = useState(false)
  const handleSnsToggle = () => {
    setSnsToggle((prev) => !prev)
  }

  const { email, password, confirmpassword, nickname, errors, setMultipleValues, setErrors } = signUpValuesStore()

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setMultipleValues({ [name]: value })
    setErrors({ [name]: null })
  }

  const handleValidateError = (e: React.FormEvent) => {
    e.preventDefault()

    const newValidateErrors = {
      email: "",
      password: "",
      nickname: "",
      confirmpassword: "",
    }

    if (!email || !emailPattern.test(email)) {
      newValidateErrors.email = "올바른 이메일 주소를 입력해주세요."
    }
    if (!nickname || nickname.length < 3) {
      newValidateErrors.nickname = "사용할 수 없는 닉네임입니다."
    }
    if (!password || !passwordPattern.test(password)) {
      newValidateErrors.password = "올바른 비밀번호를 입력해주세요."
    }
    if (confirmpassword !== password) {
      newValidateErrors.confirmpassword = "비밀번호가 일치하지 않습니다."
    }
    setErrors(newValidateErrors)

    if (Object.values(newValidateErrors).every((error) => error === "")) {
      router.push("/register/agreements")
    }
  }
  return {
    snsToggle,
    handleSnsToggle,
    handleChangeValues,
    handleValidateError,
  }
}

export default useRegisterAuthForm

const mockResolve = async () => {
  return await new Promise<{ data: AuthenticationResponse }>((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          user: {
            nickname: "userId",
            email: "user123@example.com",
            password: "123443432",
            notification: true,
            role: "user",
          },
        },
      })
    }, 2000) // 1초 지연
  })
}
// 목업 리졸브 함수
// 2초 후에 resolve 함수가 호출되어 프로미스 완료 상태가 됨
// 완료되면 data 객체들을 받을 수 있음

const mockReject = async () => {
  await new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Authentication failed"))
    }, 1000) // 1초 지연
  })
}
