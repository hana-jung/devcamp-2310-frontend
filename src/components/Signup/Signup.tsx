import { AUTH_SIGNUP } from "../../constants/apiEndpoints"
import { useAuthForm, Values } from "../../hooks/auth/useAuthForm"
import { emailPattern, passwordPattern } from "../../utils/validationPatterns"

export default function Signup() {
  const validate = (values: Values) => {
    const errors: { email?: string; password?: string; username?: string; confirmPassword?: string } = {}

    if (!values.email) {
      errors.email = "이메일을 입력하세요."
    } else if (!emailPattern.test(values.email)) {
      errors.email = "올바른 이메일을 입력하세요."
    }

    if (!values.password) {
      errors.password = "비밀번호를 입력하세요."
    } else if (!passwordPattern.test(values.password)) {
      errors.password =
        "비밀번호는 적어도 하나의 소문자, 하나의 대문자, 하나의 숫자를 포함해야 하며 8자 이상이어야 합니다."
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "비밀번호를 입력하세요."
    } else if (!passwordPattern.test(values.confirmPassword)) {
      errors.confirmPassword =
        "비밀번호는 적어도 하나의 소문자, 하나의 대문자, 하나의 숫자를 포함해야 하며 8자 이상이어야 합니다."
    }

    if (values.password !== values.confirmPassword) {
      errors.password = "비밀번호가 일치하지 않습니다."
      errors.confirmPassword = "비밀번호가 일치하지 않습니다."
    }

    if (!values.username) errors.username = "사용자 이름을 입력하세요."
    return errors
  }

  const { handleChange, handleSubmit, values, validationErrors, serverError, isLoading } = useAuthForm(
    { email: "", password: "", confirmPassword: "", username: "" },
    validate,
    AUTH_SIGNUP
  )

  return (
    <section
      id="signup"
      className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"
    >
      <form noValidate className="w-full max-w-md space-y-8" onSubmit={handleSubmit}>
        <header>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">회원가입</h2>
        </header>
        <fieldset>
          <div className="-space-y-px rounded-md shadow-sm">
            <div className="py-2">
              <label htmlFor="username" className="sr-only">
                이름
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={values.username}
                onChange={handleChange}
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="사용자 이름"
              />
              {validationErrors.username && <p className="text-red-500">{validationErrors.username}</p>}
            </div>

            <div className="py-2">
              <label htmlFor="email" className="sr-only">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="이메일"
              />
              {validationErrors.email && <p className="text-red-500">{validationErrors.email}</p>}
            </div>

            <div className="py-2">
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="비밀번호"
              />
              {validationErrors.password && <p className="text-red-500">{validationErrors.password}</p>}
            </div>

            <div className="py-2">
              <label htmlFor="confirmPassword" className="sr-only">
                패스워드 확인
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword || ""}
                onChange={handleChange}
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="패스워드 확인"
              />
              {validationErrors.confirmPassword && <p className="text-red-500">{validationErrors.confirmPassword}</p>}
            </div>
          </div>

          <div className="py-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white ${
                isLoading
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              }`}
            >
              {isLoading ? <div className="spinner"></div> : "회원가입"}
            </button>
            {serverError && <p className="text-center text-red-500">{serverError}</p>}
          </div>
        </fieldset>
      </form>
    </section>
  )
}
