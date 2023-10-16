import Image from "next/image"
import { useState } from "react"
import SocialLogin from "./SocialLogin"

export default function Login() {
  const [loginValues, setValues] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState({
    email: "",
    password: "",
  })

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({ ...loginValues, [name]: value })
    setError({ ...error, [name]: "" })
  }

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    const errors = { email: "", password: "" }

    if (!loginValues.email) {
      errors.email = "이메일을 입력해주세요"
    }
    // 여기서 이메일 유효성 검사 로직을 추가할 수 있습니다.

    if (!loginValues.password) {
      errors.password = "비밀번호를 입력해주세요"
    }
    // 여기서 비밀번호 유효성 검사 로직을 추가할 수 있습니다.

    setError(errors)
  }

  return (
    <main className="h-[720px] w-[375px] bg-white">
      <nav className="h-[56px] w-full border-b border-navy"></nav>
      <div className="flex flex-col items-center justify-center px-[42px] pb-[74px]">
        <section>
          <form noValidate className="flex flex-col items-center justify-center" onSubmit={onSubmitHandler}>
            <header className="pb-[35px] pt-[40px] text-center text-[22px] font-bold">
              <h1>로그인</h1>
            </header>
            <div className="flex flex-col items-center justify-center">
              <label
                className={`flex w-[292px] flex-col rounded-lg border ${
                  error.email ? "border-[#E01B41]" : "border-[#D5D5D6]"
                }  px-4 py-2 text-xs`}
              >
                이메일
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
                <div className="mt-1 flex w-full gap-1 text-left text-[12px] text-[#E01B41]">
                  <Image src="assets/img/errorIcon.svg" alt="error" width={12} height={12} />
                  <span>{error.email}</span>
                </div>
              )}
              <label
                className={`mt-4 flex w-[292px] flex-col rounded-lg border ${
                  error.password ? "border-[#E01B41]" : "border-[#D5D5D6]"
                } border-[#D5D5D6] px-4 py-2 text-xs`}
              >
                비밀번호
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={loginValues.password}
                  onChange={onChangeHandler}
                  className="w-[176px] text-base placeholder:text-base"
                  placeholder="비밀번호를 입력해주세요"
                  required
                />
              </label>
              {error.password && (
                <div className="mt-1 flex w-full gap-1 text-left text-[12px] text-[#E01B41]">
                  <Image src="assets/img/errorIcon.svg" alt="error" width={12} height={12} />
                  <span>{error.password}</span>
                </div>
              )}
            </div>
            <div className="w-full pb-[12px] pt-[5px] text-right text-sm">비밀번호를 잊으셨나요?</div>
            <button className="w-full rounded-[4px] bg-black px-5 py-4 text-white">로그인</button>
          </form>
        </section>
        <div className="my-4 w-full border-b border-[#C7C9CD]"></div>
        <SocialLogin />
        <div className="pt-[32px] text-sm text-[#91959D]">
          회원이 아니신가요? <span className="text-sm font-bold text-[#747474]">회원가입</span>
        </div>
      </div>
    </main>
  )
}
