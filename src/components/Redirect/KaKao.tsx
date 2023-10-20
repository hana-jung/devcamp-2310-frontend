import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { kakakoInstance } from "src/axios/axios"
import { useUserStore } from "src/stores/user-store/userStore"

const KaKao = () => {
  const { setUser, setAccessToken, setRefreshToken } = useUserStore.getState()

  const router = useRouter()
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code")
    const REDIRECT_URL = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI

    const body = {
      code,
      redirect_uri: REDIRECT_URL,
    }
    console.log("usereee")
    const postKaKao = async () => {
      try {
        const response = await kakakoInstance.post("/auth/kakaotoken", body)
        const { user, accessToken, refreshToken } = response.data
        setUser(user)
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)
        router.push("/")
      } catch (error) {
        console.log("error", error)
      }
      // console.log("ds")
    }
    postKaKao()
  }, [router.query])
  console.log("2313123")
  return <div>카카오 로그인쓰</div>
}

export default KaKao
