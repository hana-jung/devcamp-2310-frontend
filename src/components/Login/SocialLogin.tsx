import Image from "next/image"
import React from "react"

const SocialLogin = () => {
  return (
    <section className="flex flex-col space-y-4">
      <button className="flex w-[292px] items-center justify-center rounded-[4px] bg-[#FEE500] px-5 py-[13px]">
        <Image
          src="/assets/img/kakaoLogo.svg"
          alt="kakako"
          width={20}
          height={20}
          className="translate-x-[-5px] translate-y-[1px]"
        />
        <span className="translate-y-[1px] text-[15px] font-bold leading-6 text-[#2D3138]">
          카카오로 3초만에 시작하기
        </span>
      </button>
      <button className="flex w-full items-center justify-center rounded-[4px] bg-black px-5 py-[15px]">
        <Image src="/assets/img/googleLogo.svg" alt="google" width={20} height={20} className="shrink-0" />
        <span className="ml-2 translate-x-[-1px] translate-y-[2px] text-[16px] font-bold text-white">
          구글로 시작하기
        </span>
      </button>
      <button className="flex w-full items-center justify-center rounded-[4px] bg-black px-5 py-[15px]">
        <Image src="/assets/img/appleLogo.svg" alt="apple" width={15} height={15} className="shrink-0" />
        <span className="ml-3 translate-y-[2px] text-[16px] font-bold text-white">Apple로 시작하기</span>
      </button>
    </section>
  )
}

export default SocialLogin
