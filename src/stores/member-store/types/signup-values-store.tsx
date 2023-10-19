import { create, StateCreator } from "zustand"

export type SignupValuesState = {
  email: string
  password: string
  confirmpassword: string
  nickname: string
  notification: boolean
  role: string
  errors: {
    email: string | null
    password: string | null
    confirmpassword: string | null
    nickname: string | null
  }

  setErrors: (errors: Partial<SignupValuesState["errors"]>) => void
  setMultipleValues: (values: Partial<SignupValuesState>) => void
}

export const signUpValuesStore = create<SignupValuesState>((set) => ({
  email: "",
  password: "",
  confirmpassword: "",
  nickname: "",
  notification: false,
  role: "user",
  errors: {
    email: null,
    password: null,
    confirmpassword: null,
    nickname: null,
  },
  setErrors: (errors: Partial<SignupValuesState["errors"]>) =>
    set((state) => ({ errors: { ...state.errors, ...errors } })),

  setMultipleValues: (values: Partial<SignupValuesState>) => set((state) => ({ ...state, ...values })),
}))
