import Cookies from "js-cookie"
import { create, SetState } from "zustand"
import { devtools } from "zustand/middleware"
import { User, UserStore } from "./types/userStore.types"
import { env } from "../../../env.mjs"
import { getLocalStorageValue, setLocalStorageValue } from "../../utils/storage"

const store = (set: SetState<UserStore>): UserStore => ({
  user: getLocalStorageValue<User | null>("user", null),
  accessToken: Cookies.get("accessToken") || null,
  refreshToken: Cookies.get("refreshToken") || null,
  setAccessToken: (token) => {
    Cookies.set("accessToken", token, { expires: env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRY_DAYS })
    set({ accessToken: token })
  },
  setRefreshToken: (token) => {
    Cookies.set("refreshToken", token, { expires: env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY_DAYS })
    set({ refreshToken: token })
  },
  setUser: (user) => {
    setLocalStorageValue("user", user)
    set({ user })
  },
  logout: () => {
    localStorage.removeItem("user")
    Cookies.set("accessToken", "", { expires: 0 })
    Cookies.set("refreshToken", "", { expires: 0 })
    set({ user: null, accessToken: null })
  },
})

export const useUserStore =
  process.env.NODE_ENV !== "production" ? create<UserStore>()(devtools(store)) : create<UserStore>()(store)