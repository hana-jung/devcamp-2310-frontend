export type Member = {
  email: string
  password: string
  nickname: string
  notification: boolean
}

export type MemberStore = {
  user: Member | null
  accessToken: string | null
  refreshToken: string | null
  setUser: (user: Member) => void
  setAccessToken: (token: string) => void
  setRefreshToken: (token: string) => void
  // getCookieStoredValue: (key: string) => void
  logout: () => void
}
