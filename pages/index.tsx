import Head from "next/head"
import NavigationBar from "../src/components/NavigationBar/NavigationBar"

export default function Web() {
  return (
    <>
      <Head>
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>데브캠프 교육 | 스파르타</title>
      </Head>
      <NavigationBar />
      <main className="flex h-[645.833px] flex-col justify-end bg-blue-950 px-[71.88px] pb-[35.42px]">
        <div className="flex flex-col items-center justify-center">
          <button className="btn-main mb-[15.71px] bg-purple-gradient">지금 신청하기</button>
          <button className="btn-main h-[56.25px] border border-[#B3B7BA] bg-transparent pb-[14.25px] pl-[29px] pr-[33.25px] pt-[12px] text-base font-medium text-[#F2F4F7]">
            혜택...이게 끝인가요?
          </button>
        </div>
      </main>
    </>
  )
}
