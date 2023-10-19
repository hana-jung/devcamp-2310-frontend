import { useRouter } from "next/router"
import { useState } from "react"
import useRegisterAuthForm from "src/hooks/auth/useRegisterAuthForm"
import { EMAIL_REGISTER } from "../../constants/apiEndpoints"
import { useAuthForm, Values } from "../../hooks/auth/useAuthForm"
import { emailPattern, passwordPattern } from "../../utils/validationPatterns"
import AppleLogin from "../Login/AppleLogin"
import GoogleLogin from "../Login/GoogleLogin"
import KakaoLogin from "../Login/KakaoLogin"

export default function Register() {
  const [emailToggle, setEmailToggle] = useState(false)
  const [snsToggle, setSnsToggle] = useState(false)
  const router = useRouter()

  const handleToggle = () => {
    setEmailToggle((prev) => !prev)
  }

  const handleSnsToggle = () => {
    setSnsToggle((prev) => !prev)
  }

  const user = {
    nickname: "",
    email: "",
    password: "",
  }

  // const { handleChangeUserValues, handleSubmit, userValues, validationErrors, serverError, isLoading } =
  //   useRegisterAuthForm({ user, validate, EMAIL_REGISTER })
  // 여기에 useRegisterAuthForm에서 다 가져와서 밸리데이션 ㄱ

  return (
    <main className="h-auto w-[375px] bg-white">
      <nav className="h-[56px] w-full border-b border-navy"></nav>
      <div className="flex flex-col items-center justify-center px-[42px] pb-[74px]">
        <section>
          <form noValidate className="flex flex-col items-center justify-center">
            <header className="ml-[13px] pb-[25px] pt-[42px] text-center text-[22px] font-bold leading-7">
              <h1>회원가입</h1>
            </header>
            <div className="flex flex-col items-center justify-center">
              {emailToggle ? (
                <div className="my-8">
                  <label
                    className={`mb-4 flex w-[292px] flex-col rounded-lg border
                border-[#D5D5D6] px-4 py-2 text-xs `}
                  >
                    닉네임
                    <input
                      id="nickname"
                      name="nickname"
                      type="text"
                      // value={loginValues.email}
                      // onChange={onChangeHandler}
                      className="w-[176px] text-base placeholder:text-base"
                      placeholder="닉네임을 입력해주세요"
                      required
                    />
                  </label>
                  {/* {error.email && ( */}
                  <div className="mt-1 flex w-full gap-1 text-left text-[12px] text-[#E01B41]">
                    {/* <Image src="assets/img/errorIcon.svg" alt="error" width={12} height={12} /> */}
                    {/* <span>{error.email}</span> */}
                  </div>
                  {/* )} */}
                  <label
                    className={`flex w-[292px] flex-col rounded-lg border border-[#D5D5D6]
                px-4 py-2 text-xs`}
                  >
                    이메일
                    <input
                      id="email"
                      name="email"
                      type="email"
                      // value={loginValues.email}
                      // onChange={onChangeHandler}
                      className="w-[176px] text-base placeholder:text-base"
                      placeholder="이메일 주소를 입력해주세요"
                      required
                    />
                  </label>
                  {/* {error.email && ( */}
                  <div className="mt-1 flex w-full gap-1 text-left text-[12px] text-[#E01B41]">
                    {/* <Image src="assets/img/errorIcon.svg" alt="error" width={12} height={12} /> */}
                    {/* <span>{error.email}</span> */}
                  </div>
                  {/* )} */}
                  <label
                    className={`mt-4 flex w-[292px] flex-col rounded-lg border
                border-[#D5D5D6] px-4 py-2 text-xs`}
                  >
                    비밀번호
                    <input
                      id="password"
                      name="password"
                      type="password"
                      // value={loginValues.password}
                      // onChange={onChangeHandler}
                      className="w-[176px] text-base placeholder:text-base"
                      placeholder="비밀번호를 입력해주세요"
                      required
                    />
                  </label>
                  {/* {error.password && ( */}
                  <label
                    className={`mt-4 flex w-[292px] flex-col rounded-lg border
                border-[#D5D5D6] px-4 py-2 text-xs`}
                  >
                    비밀번호 확인
                    <input
                      id="passwordCheck"
                      name="passwordCheck"
                      type="password"
                      // value={loginValues.password}
                      // onChange={onChangeHandler}
                      className="w-[176px] text-base placeholder:text-base"
                      placeholder="비밀번호를 다시 입력해주세요"
                      required
                    />
                  </label>
                  {/* {error.password && ( */}
                  <button onClick={handleToggle} className="w-full rounded-[4px] bg-black px-5 py-4 text-white">
                    다음
                  </button>
                  <div className="flex flex-auto py-4">
                    <hr className="my-4 w-full border-b border-[#C7C9CD]" />
                    <span className="px-[9.5px] text-sm">또는</span>
                    <hr className="my-4 w-full border-b border-[#C7C9CD]" />
                  </div>

                  {snsToggle ? (
                    <section className="flex flex-col space-y-4">
                      <KakaoLogin />
                      <GoogleLogin />
                      <AppleLogin />
                    </section>
                  ) : (
                    <>
                      <KakaoLogin />
                      <button onClick={handleSnsToggle} className="w-full rounded-[4px] bg-black px-5 py-4 text-white">
                        다른 방법으로 시작하기
                      </button>
                    </>
                  )}
                </div>
              ) : (
                ""
              )}

              <div className="mt-1 flex w-full gap-1 text-left text-[12px] text-[#E01B41]">
                {/* <Image src="assets/img/errorIcon.svg" alt="error" width={12} height={12} /> */}
                {/* <span>{error.password}</span> */}
              </div>
              {/* )} */}
            </div>
          </form>
        </section>

        {emailToggle ? (
          ""
        ) : (
          <>
            <section className="flex flex-col space-y-4">
              <KakaoLogin />
              <GoogleLogin />
              <AppleLogin />
            </section>
            <div className="my-4 w-full border-b border-[#C7C9CD]"></div>
            <button
              onClick={() => router.push("/register/email-register")}
              className="w-full translate-y-[1px] rounded-[4px] bg-[#393F7B] px-5 py-[15px] text-[15px] text-white"
            >
              이메일 주소로 시작하기
            </button>
          </>
        )}

        <div
          onClick={() => router.push("/login")}
          className="translate-x-[7px] pt-[33px] text-[14px] font-normal leading-[18px] text-[#91959D]"
        >
          이미 계정이 있으신가요? <span className="text-[14px] font-bold leading-[18px] text-[#747474]"> 로그인</span>
        </div>
      </div>
    </main>
  )
}
