import Cookies from "js-cookie"
import create, { SetState } from "zustand"
import { devtools } from "zustand/middleware"
import { ACCESS_TOKEN_EXPIRY_DAYS, REFRESH_TOKEN_EXPIRY_DAYS } from "../../config/authConfig"
import { loadFromLocalStorage, saveToLocalStorage } from "../../utils/storage"

type User = {
  id: string
  name: string
  email: string
}

type UserStore = {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  setAccessToken: (token: string) => void
  setRefreshToken: (token: string) => void
  setUser: (user: User) => void
  logout: () => void
  setAll: (userData: { user: User; accessToken: string; refreshToken: string }) => void
}

const store = (set: SetState<UserStore>): UserStore => ({
  user: loadFromLocalStorage<User | null>("user", null),
  accessToken: Cookies.get("accessToken") || null,
  refreshToken: Cookies.get("accessToken") || null,
  setAccessToken: (token) => {
    Cookies.set("accessToken", token, { expires: ACCESS_TOKEN_EXPIRY_DAYS })
    set({ accessToken: token })
  },
  setRefreshToken: (token) => {
    Cookies.set("refreshToken", token, { expires: REFRESH_TOKEN_EXPIRY_DAYS })
    set({ accessToken: token })
  },
  setUser: (user) => {
    saveToLocalStorage("user", user)
    set({ user })
  },
  setAll: (userData: { user: User; accessToken: string; refreshToken: string }) => {
    const { user, accessToken, refreshToken } = userData
    saveToLocalStorage("user", user)
    Cookies.set("accessToken", accessToken, { expires: 7 })
    Cookies.set("refreshToken", refreshToken, { expires: 30 })
    set({ user, accessToken, refreshToken })
  },
  logout: () => {
    localStorage.removeItem("user")
    Cookies.set("accessToken", "", { expires: 0 })
    Cookies.set("refreshToken", "", { expires: 0 })
    set({ user: null, accessToken: null })
  },
})

export const useUserStore = create(process.env.NODE_ENV !== "production" ? devtools(store) : store)
