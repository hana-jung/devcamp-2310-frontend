import Image from "next/image"
import React from "react"
import AppleLogin from "src/components/Login/AppleLogin"
import GoogleLogin from "src/components/Login/GoogleLogin"
import KakaoLogin from "src/components/Login/KakaoLogin"
import useRegisterAuthForm from "src/hooks/auth/useRegisterAuthForm"
import { signUpValuesStore } from "src/stores/member-store/types/signup-values-store"

const EmailRegister = () => {
  const { email, password, confirmpassword, nickname, errors } = signUpValuesStore()
  const { snsToggle, handleSnsToggle, handleChangeValues, handleValidateError } = useRegisterAuthForm()

  return (
    <main className="h-auto w-[375px] bg-white">
      <nav className="h-[56px] w-full border-b border-navy"></nav>
      <div className="flex flex-col items-center justify-center px-[42px] pb-[86px]">
        <section>
          <form noValidate onSubmit={handleValidateError} className="flex flex-col items-center justify-center">
            <header className="mr-1 pt-[42px] text-center text-[22px] font-bold leading-7">
              <h1>회원가입</h1>
            </header>
            <div className="flex flex-col items-center justify-center">
              <div className="my-8">
                <label
                  className={`mb-4 flex w-[291px] translate-y-[-2px] flex-col rounded-lg border
                border-[#D5D5D6] ${
                  errors.nickname ? "border-[E01B41]" : "border-[#D5D5D6]"
                } px-[14px] py-[7px] text-xs`}
                >
                  <span className="translate-y-[2px]">닉네임</span>
                  <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    value={nickname}
                    onChange={handleChangeValues}
                    className="w-[176px] text-base placeholder:translate-y-[2px]  placeholder:text-base"
                    placeholder="닉네임을 입력해주세요."
                    required
                  />
                </label>
                {errors.nickname && (
                  <div className="mt-1 flex w-full gap-1 text-left text-[12px] text-[#E01B41]">
                    <Image src="/assets/img/errorIcon.svg" alt="error" width={12} height={12} />
                    <span>{errors.nickname}</span>
                  </div>
                )}
                <label
                  className={`flex w-[292x] translate-y-[-2px] flex-col rounded-lg border border-[#D5D5D6]
                px-[14px] py-[7px] text-xs`}
                >
                  <span className="translate-x-[2px] translate-y-[1px]">이메일</span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChangeValues}
                    className="w-[176px] text-base placeholder:translate-y-[2px] placeholder:text-base"
                    placeholder="이메일 주소를 입력해주세요."
                    required
                  />
                </label>
                {errors.email && (
                  <div className="mt-1 flex w-full gap-1 text-left text-[12px] text-[#E01B41]">
                    <Image src="/assets/img/errorIcon.svg" alt="error" width={12} height={12} />
                    <span>{errors.email}</span>
                  </div>
                )}
                <label
                  className={`mt-[11px] flex w-[291px] translate-y-[3px] flex-col rounded-lg border
                border-[#D5D5D6] px-[14px] py-[7px] text-xs`}
                >
                  <span className="translate-x-[2px] translate-y-[1px]">비밀번호</span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleChangeValues}
                    className="w-[176px] text-base placeholder:translate-y-[2px] placeholder:text-base"
                    placeholder="비밀번호를 입력해주세요."
                    required
                  />
                </label>
                {errors.password && (
                  <div className="mt-1 flex w-full gap-1 text-left text-[12px] text-[#E01B41]">
                    <Image src="/assets/img/errorIcon.svg" alt="error" width={12} height={12} />
                    <span>{errors.password}</span>
                  </div>
                )}
                <label
                  className={`mt-4 flex w-[292px] translate-y-[3px] flex-col rounded-lg border
                border-[#D5D5D6] px-[14px] py-[7px] text-xs`}
                >
                  <span className="translate-x-[2px] translate-y-[1px]">비밀번호 확인</span>
                  <input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    value={confirmpassword}
                    onChange={handleChangeValues}
                    className="w-[190px] text-base placeholder:translate-y-[2px] placeholder:text-base"
                    placeholder="비밀번호를 다시 입력해주세요."
                    required
                  />
                </label>
                {errors.confirmpassword && (
                  <div className="mt-1 flex w-full gap-1 text-left text-[12px] text-[#E01B41]">
                    <Image src="/assets/img/errorIcon.svg" alt="error" width={12} height={12} />
                    <span>{errors.confirmpassword}</span>
                  </div>
                )}
                {password && confirmpassword && password.trim() === confirmpassword.trim() ? (
                  <p>비밀번호가 일치합니다</p>
                ) : (
                  ""
                )}
                <button
                  type="submit"
                  className="mt-[33px] w-full translate-y-[3px] rounded-[4px] bg-[#393F7B] py-[15px] text-[15px] font-bold text-white"
                >
                  다음
                </button>
                <div className="my-2 flex w-full flex-auto items-center py-2 text-[#C7C9CD]">
                  <div className="my-2 h-[1px] w-full grow bg-[#C7C9CD]"></div>
                  <span className="mx-[14px] shrink-0 text-[14px]">또는</span>
                  <div className="my-2 h-[1px] w-full grow bg-[#C7C9CD]"></div>
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
                    <button
                      type="button"
                      onClick={handleSnsToggle}
                      className="mb-[-24px] mt-[6px] w-full translate-y-[10px] rounded-[4px] bg-black px-5 pb-[14px] pt-[15px] text-[15px] font-bold text-white"
                    >
                      <span>다른 방법으로 시작하기</span>
                    </button>
                  </>
                )}
              </div>

              <div className="mt-1 flex w-full gap-1 text-left text-[12px] text-[#E01B41]">
                {/* <Image src="assets/img/errorIcon.svg" alt="error" width={12} height={12} /> */}
                {/* <span>{error.password}</span> */}
              </div>
              {/* )} */}
            </div>
          </form>
        </section>

        {/* <div
          className={`translate-y-[9px] pt-[13px] text-[14px] font-normal leading-[18px] text-[#91959D] ${
            snsToggle ? "translate-y-[-100px]" : "translate-y-[9px]"
          }`}
        >
          이미 계정이 있으신가요? <span className="text-[14px] font-bold leading-[18px] text-[#747474]"> 로그인</span>
        </div> */}
      </div>
    </main>
  )
}

export default EmailRegister
