import Image from "next/image"
import React from "react"

const GoogleLogin = () => {
  return (
    <>
      <>
        <button className="flex w-full items-center justify-center rounded-[4px] bg-black px-5 pb-[13px] pt-[16px] align-middle">
          <Image src="/assets/img/googleLogo.svg" alt="google" width={21} height={21} className="shrink-0" />
          <span className="ml-2 translate-x-[-1px]  text-[16px] font-bold text-white">구글로 시작하기</span>
        </button>
      </>
    </>
  )
}

export default GoogleLogin
