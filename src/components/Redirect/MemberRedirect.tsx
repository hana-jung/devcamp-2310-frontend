import React from "react"
import GoogleLogo from "../../../public/assets/img/googleLogo.svg"
import MoreIcon from "../../../public/assets/img/moreIcon.svg"

const MemberRedirect = () => {
  return (
    <main className="h-auto w-[375px] bg-white">
      <nav className="mb-[16px] h-[56px] w-full border-b border-navy"></nav>
      <header className="w-full pb-8 pt-10 text-center text-[22px] text-[#2D3138]">
        <h1 className="mb-2 text-[22px] font-bold leading-7">가입한 계정이 있습니다.</h1>
        <p className="mr-1 text-[14px] font-normal leading-[18px]">기존 계정을 통해 로그인해주세요</p>
      </header>
      <div className="flex flex-col items-center justify-center px-[42px] pb-[284px]">
        <div className="flex w-full translate-y-[-1px] items-center rounded-lg border px-4 py-2">
          <GoogleLogo width={20} height={20} />
          <div className="flex w-full items-center justify-between">
            <div className="pl-[11px]">
              <p className="mb-[2px] text-[17px] font-medium leading-6">wiki@wiki.co.kr</p>
              <p className="text-[15px] font-normal leading-[18px] text-[#91959D]">2023. 01 01 가입함</p>
            </div>
            <div className="ml-3">
              <MoreIcon width={7} height={14} />
            </div>
          </div>
        </div>
        <div className="translate-x-[2px] translate-y-[-2px] pt-8 text-sm text-[#747474]">
          도움이 필요하신가요? <span className="font-bold">고객센터 문의하기</span>
        </div>
      </div>
    </main>
  )
}

export default MemberRedirect
