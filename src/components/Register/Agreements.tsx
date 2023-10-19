import React, { useState } from "react"
import useAgreement from "src/hooks/auth/useAgreement"
import { signUpValuesStore } from "src/stores/member-store/types/signup-values-store"
import CheckIcon from "../../../public/assets/img/checkIcon.svg"
import MoreIcon from "../../../public/assets/img/moreIcon.svg"

const Agreements = () => {
  const { agree, allAgree, error, handleAgreeCheck, handleAllAgreementCheck, handleSubmit, isLoading } = useAgreement()

  return (
    <main className="h-auto w-[375px] bg-white">
      <nav className="h-[56px] w-full border-b border-navy"></nav>
      <header className="w-full pb-[26px] pt-10 text-center text-[22px] font-bold text-[#2D3138] ">
        <h1>약관 동의</h1>
      </header>
      {error && <p>{error}</p>}
      <div className="flex flex-col items-center justify-center gap-y-[10px] px-6 pb-[160px] align-middle">
        <input
          type="checkbox"
          onChange={handleAllAgreementCheck}
          checked={allAgree}
          id="allAgree"
          name="allAgree"
          className="hidden"
        />
        <label
          htmlFor="allAgree"
          className=" flex w-full translate-y-[-3px] cursor-pointer items-center gap-[6px] text-[16px] font-bold"
        >
          <CheckIcon fill={`${allAgree ? "#393F7B" : "#ffff"} `} alt="check" />
          <span className="translate-y-[2px]">모두 동의</span>
        </label>
        <hr className=" w-full border-b border-[#C7C9CD]" />
        <div className="mt-1 flex w-full items-center justify-between">
          <input
            type="checkbox"
            id="serviceAgree"
            onChange={handleAgreeCheck}
            checked={agree.serviceAgree}
            name="serviceAgree"
            className=" hidden"
            required
          />
          <label htmlFor="serviceAgree" className="flex cursor-pointer items-center gap-[6px] text-[14px] font-normal ">
            <CheckIcon fill={`${agree.serviceAgree ? "#393F7B" : "#ffff"} `} alt="check" />
            (필수) 서비스 이용약관 동의
          </label>
          <MoreIcon />
        </div>
        <div className="mt-1 flex w-full items-center justify-between">
          <input
            type="checkbox"
            onChange={handleAgreeCheck}
            checked={agree.personalInfoAgree}
            id="personalInfoAgree"
            name="personalInfoAgree"
            className=" hidden"
            required
          />
          <label
            htmlFor="personalInfoAgree"
            className="flex w-full cursor-pointer items-center gap-[6px] text-[14px] font-normal"
          >
            <CheckIcon fill={`${agree.personalInfoAgree ? "#393F7B" : "#ffff"} `} alt="check" />
            (필수) 개인정보 수집 및 이용에 대한 동의
          </label>
          <MoreIcon />
        </div>
        <div className="mt-[3px] flex w-full items-center justify-between">
          <input
            type="checkbox"
            id="ageAgree"
            onChange={handleAgreeCheck}
            checked={agree.ageAgree}
            name="ageAgree"
            className=" hidden"
            required
          />
          <label
            htmlFor="ageAgree"
            className="flex w-full cursor-pointer  items-center gap-[6px] text-[14px] font-normal"
          >
            <CheckIcon fill={`${agree.ageAgree ? "#393F7B" : "#ffff"} `} alt="check" />
            (필수) 만 14세 이상입니다.
          </label>
        </div>
        <div className="mb-[20px] mt-[3px] flex w-full items-center justify-between">
          <input
            type="checkbox"
            id="eventAgree"
            onChange={handleAgreeCheck}
            checked={agree.eventAgree}
            name="eventAgree"
            className=" hidden"
          />
          <label
            htmlFor="eventAgree"
            className="flex w-full cursor-pointer items-center gap-[6px] text-[14px] font-normal"
          >
            <CheckIcon fill={`${agree.eventAgree ? "#393F7B" : "#ffff"} `} alt="check" />
            (선택) 이벤트 정보 알림 수신에 동의합니다.
          </label>
        </div>
        <button
          onClick={handleSubmit}
          className="w-[296px] rounded-[4px] bg-[#393F7B] py-[14px] text-white"
          disabled={isLoading}
        >
          다음
        </button>
      </div>
    </main>
  )
}

export default Agreements
