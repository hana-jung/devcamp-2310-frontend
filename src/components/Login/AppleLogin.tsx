import Image from "next/image"
import React from "react"

const AppleLogin = () => {
  return (
    <>
      <button className="flex w-full items-center justify-center rounded-[4px] bg-black px-5 py-[16px]">
        <Image
          src="/assets/img/appleLogo.svg"
          alt="apple"
          width={16}
          height={16}
          className="shrink-0 translate-x-[-1px]"
        />
        <span className="ml-[11px] translate-y-[1px] text-[16px] font-bold leading-5 text-white">Apple로 시작하기</span>
      </button>
    </>
  )
}

export default AppleLogin
