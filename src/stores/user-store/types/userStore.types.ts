export type User = {
  email: string
  password?: string
  confirmpassword?: string
  nickname: string
  notification?: boolean
  role?: string
}

export type UserStore = {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  setAccessToken: (token: string) => void
  setRefreshToken: (token: string) => void
  setUser: (user: User) => void
  logout: () => void
}
