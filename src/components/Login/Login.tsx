import { AxiosResponse } from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { loginInstance } from "src/axios/axios"
import useRegisterAuthForm from "src/hooks/auth/useRegisterAuthForm"
import { useUserStore } from "src/stores/user-store/userStore"
import { loginAuthResponse } from "src/types/apiResponse"
import AppleLogin from "./AppleLogin"
import GoogleLogin from "./GoogleLogin"
import KakaoLogin from "./KakaoLogin"

export default function Login() {
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

  return (
    <main className="h-[720px] w-[375px] bg-white">
      <nav className="h-[56px] w-full border-b border-navy"></nav>
      <div className="flex flex-col items-center justify-center px-[42px] pb-[74px]">
        <section>
          <form noValidate className="flex flex-col items-center justify-center" onSubmit={onSubmitHandler}>
            <header className="pb-[29px] pt-[40px] text-center text-[22px] font-bold">
              <h1>로그인</h1>
            </header>
            <div className="flex flex-col items-center justify-center">
              <label
                className={`flex w-[292px]  flex-col rounded-lg border pb-[5px] ${
                  error.email ? "translate-y-[-3px] border-[#E01B41]" : "border-[#D5D5D6]"
                }  px-4 py-[11px] text-xs`}
              >
                <span className="translate-x-[-1px] translate-y-[-2px]">이메일</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={loginValues.email}
                  onChange={onChangeHandler}
                  className="w-[176px] text-base placeholder:text-base"
                  placeholder="이메일 주소를 입력해주세요"
                  required
                />
              </label>
              {error.email && (
                <div className="mt-1 flex h-[16px] w-full translate-x-[-0.5px] translate-y-[-4px] items-center gap-[3px] text-left text-[12px] text-[#E01B41]">
                  <Image
                    src="assets/img/errorIcon.svg"
                    alt="error"
                    width={17}
                    height={17}
                    className="translate-y-[-1px]"
                  />
                  <span className="translate-y-[1px]">{error.email}</span>
                </div>
              )}
              <label
                className={`mt-[15px] flex w-[292px] translate-y-[1px] flex-col rounded-lg border pb-[6px] ${
                  error.password ? "translate-y-[-4.1px] border-[#E01B41]" : "border-[#D5D5D6]"
                } border-[#D5D5D6] px-4 py-[7px] text-xs`}
              >
                <span className="translate-x-[-1px] translate-y-[1px]">비밀번호</span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={loginValues.password}
                  onChange={onChangeHandler}
                  className="w-[179px] text-base placeholder:translate-y-[2px] placeholder:text-base"
                  placeholder="비밀번호를 입력해주세요"
                  required
                />
              </label>
              {error.password && (
                <div className="mt-1 flex h-[16px] w-full translate-y-[-2px] items-center gap-[3px] text-left text-[12px] text-[#E01B41]">
                  <Image
                    src="assets/img/errorIcon.svg"
                    alt="error"
                    width={17}
                    height={17}
                    className="translate-y-[-1px]"
                  />
                  <span className="translate-y-[1px]">{error.password}</span>
                </div>
              )}
            </div>

            <section className={`mt-[7px] translate-y-[-7px] ${error ? "mt-[10px] " : "translate-y-[10px]"}`}>
              <div className="mr-[2px] w-full translate-y-[-1px] pb-[10px] pt-[8px] text-right text-[14px] font-medium leading-[18px] text-[#111D48]">
                비밀번호를 잊으셨나요?
              </div>
              <button
                className={`w-full rounded-[4px] bg-[#111D48] px-5 pb-[11px] pt-[16px] text-[15px] font-bold text-white ${
                  error ? "translate-y-[1px]" : ""
                }`}
              >
                로그인
              </button>
              <div
                className={`mb-[15px] mt-[18px] w-full border-b border-[#C7C9CD] ${error ? "translate-y-[-1px]" : ""} `}
              ></div>
              <section className={`flex flex-col space-y-[17px] ${error ? "translate-y-[-1px]" : ""}`}>
                <KakaoLogin />
                <GoogleLogin />
                <AppleLogin />
              </section>
              <div
                className={`${
                  error.email || error.password ? "text-center" : "text-center"
                } pt-[32px] text-[14px] leading-[18px] text-[#91959D]`}
                onClick={() => router.push("/register")}
              >
                회원이 아니신가요? <span className="text-[14px] font-bold leading-[18px] text-[#747474]">회원가입</span>
              </div>
            </section>
          </form>
        </section>
      </div>
    </main>
  )
}
