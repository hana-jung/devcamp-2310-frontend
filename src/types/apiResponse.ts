export interface AuthResponse {
  user: {
    id: string
    name: string
    email: string
  }
  accessToken: string
  refreshToken: string
}

export interface ServerErrorResponse {
  message: string
}
