import Cookies from "js-cookie"
import React from "react"
import { create, StateCreator } from "zustand"
import { env } from "env.mjs"
import { getCookieStoredValue } from "src/utils/storage"
import { MemberStore } from "./types/memberStore.types"

const memberStore: StateCreator<MemberStore> = (set) => ({
  user: getCookieStoredValue("user"),
  accessToken: Cookies.get("accessToken") || null,
  refreshToken: Cookies.get("refreshToken") || null,

  setUser: (user) => {
    Cookies.set("user", JSON.stringify(user))
    set({ user })
  },
  setAccessToken: (token) => {
    Cookies.set("accessToken", token, { expires: env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRY_DAYS })
    set({ accessToken: token })
  },
  setRefreshToken: (token) => {
    Cookies.set("refreshToken", token, { expires: env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY_DAYS })
    set({ refreshToken: token })
  },
  logout: () => {
    Cookies.set("user", "")
    Cookies.set("accessToken", "", { expires: 0 })
    Cookies.set("refreshToken", "", { expires: 0 })
    set({ user: null, accessToken: null })
  },
})

export const useMemberStore = create(memberStore)
