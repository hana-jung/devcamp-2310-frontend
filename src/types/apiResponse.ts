import { type } from "os"

export type AuthResponse = {
  user: {
    nickname: string
    email: string
    password: string
    confirmpassword: string
    notification: boolean
    role: string
  }
  accessToken: string
  refreshToken: string
}

export type AuthenticationResponse = {
  user: {
    nickname: string
    email: string
    password: string
    notification: boolean
    role: string
  }
}

export type loginAuthResponse = {
  accessToken: string
  refreshToken: string
  user: {
    email: string
    nickname: string
  }
}

export type TokenRefreshResponse = {
  accessToken: string
}

export type ServerErrorResponse = {
  message: string
}

export type PointsResponse = {
  availablePoints: number
}
