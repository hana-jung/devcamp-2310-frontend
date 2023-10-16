import Image from "next/image"
import React from "react"

const SocialLogin = () => {
  return (
    <section className="flex flex-col space-y-4">
      <button className="flex w-[292px] items-center justify-center rounded-[4px] bg-[#FEE500] px-5 py-4">
        <Image src="/assets/img/kakaoLogo.svg" alt="kakako" width={24} height={24} className="shrink-0" />
        <span className="ml-1 text-[15px] text-[#2D3138]">카카오로 3초만에 시작하기</span>
      </button>
      <button className="flex w-full items-center justify-center rounded-[4px] bg-black px-5 py-3">
        <Image src="/assets/img/googleLogo.svg" alt="google" width={24} height={24} className="shrink-0" />
        <span className="ml-2 text-white">구글로 로그인하기</span>
      </button>
      <button className="flex w-full items-center justify-center rounded-[4px] bg-black px-5 py-3">
        <Image src="/assets/img/appleLogo.svg" alt="apple" width={24} height={24} className="shrink-0" />
        <span className="ml-2 text-white">Apple로 로그인하기</span>
      </button>
    </section>
  )
}

export default SocialLogin
