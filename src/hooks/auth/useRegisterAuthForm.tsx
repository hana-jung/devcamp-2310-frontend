import { AxiosError } from "axios"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import { useMemberStore } from "src/stores/member-store/memberStore"
import { SignupValuesState, signUpValuesStore } from "src/stores/member-store/types/signup-values-store"
import { AuthenticationResponse, ServerErrorResponse } from "src/types/apiResponse"
import { emailPattern, passwordPattern } from "src/utils/validationPatterns"

type ValuesType = {
  email: string
  password: string
  confirmpassword: string
  nickname: string
}

type ErrorType = {
  email: string
  password: string
  confirmpassword: string
  nickname: string
}

const useRegisterAuthForm = () => {
  const { email, password, confirmpassword, nickname, setMultipleValues, setErrors } = signUpValuesStore()
  const [values, setValues] = useState<ValuesType>({
    email: "",
    nickname: "",
    password: "",
    confirmpassword: "",
  })

  // const validationErrors = (values: ValuesType): Partial<SignupValuesState["errors"]> => {
  //   const errors: Partial<SignupValuesState["errors"]> = {}
  //   if (!values.nickname || values.nickname.length < 3) {
  //     errors.nickname = "사용할 수 없는 닉네임입니다."
  //   }
  //   if (!emailPattern.test(values.email) || !values.email) {
  //     errors.email = "올바른 이메일 주소를 입력해주세요."
  //   }
  //   if (!passwordPattern.test(values.password) || !values.password) {
  //     errors.password = "올바른 비밀번호를 입력해주세요."
  //   }
  //   if (password !== confirmpassword) {
  //     errors.confirmpassword = "비밀번호가 일치하지 않습니다."
  //   }

  //   return errors
  // }

  const validationField = (values: ValuesType): ErrorType => {
    console.log("values", values)
    const errors: ErrorType = { email: "", password: "", confirmpassword: "", nickname: "" }
    if (!values.email || !emailPattern.test(values.email)) {
      errors.email = "올바른 이메일 주소를 입력해주세요."
    }
    if (!values.nickname || values.nickname.length < 3) {
      errors.nickname = "사용할 수 없는 닉네임입니다."
    }
    if (!passwordPattern.test(values.password)) {
      errors.password = "올바른 비밀번호를 입력해주세요."
    }
    if (values.confirmpassword !== values.password) {
      errors.confirmpassword = "비밀번호가 일치하지 않습니다."
    }
    return errors
  }

  const handleChangeUserValues = (name: keyof ValuesType, value: string) => {
    setMultipleValues({ [name]: value })
  }

  return {
    handleChangeUserValues,
    validationField,
    email,
    nickname,
    password,
    confirmpassword,
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
            confirmpassword: "123443432",
            notification: true,
            role: "user",
          },
          accessToken: "fake-access-token",
          refreshToken: "fake-refresh-token",
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
