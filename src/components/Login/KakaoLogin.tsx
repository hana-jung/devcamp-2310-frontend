import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"

const KakaoLogin = () => {
  const router = useRouter()
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REST_API_KEY
  const REDIRECT_URL = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`
  //ddds
  return (
    <>
      <button
        onClick={() => router.push(link)}
        className=" flex w-[292px] translate-y-[1px] items-center justify-center rounded-[4px] bg-[#FEE500] px-5 pb-[14.5px] pt-[13.5px]"
      >
        <Image
          src="/assets/img/kakaoLogo.svg"
          alt="kakako"
          width={20}
          height={20}
          className="translate-x-[-6px] translate-y-[2.5px]"
        />
        <span className="translate-x-[1px] translate-y-[2px] text-[15px] font-bold leading-6 text-[#2D3138]">
          카카오로 3초만에 시작하기
        </span>
      </button>
    </>
  )
}

export default KakaoLogin
