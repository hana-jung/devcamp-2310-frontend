export interface AuthResponse {
  user: {
    name: string
    email: string
  }
  accessToken: string
}

export interface ServerErrorResponse {
  message: string
}
