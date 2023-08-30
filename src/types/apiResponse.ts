export type AuthResponse = {
  user: {
    id: string
    name: string
    email: string
  }
  accessToken: string
  refreshToken: string
}

export type TokenRefreshResponse = {
  accessToken: string
}

export type ServerErrorResponse = {
  message: string
}
