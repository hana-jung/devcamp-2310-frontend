import Cookies from "js-cookie"

export const setLocalStorageValue = <T>(key: string, value: T) => {
  if (typeof window === "undefined") {
    return
  }
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorageValue = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") {
    return defaultValue
  }
  const storedValue = localStorage.getItem(key)
  return storedValue ? (JSON.parse(storedValue) as T) : defaultValue
}

export const setCookieStorageValue = <T>(key: string, value: T, options?: Cookies.CookieAttributes): void => {
  if (typeof window === "undefined") {
    return
  }
  Cookies.set(key, JSON.stringify(value), options)
}
export const getCookieStoredValue = <T>(key: string): T | null => {
  if (typeof window === "undefined") {
    return null
  }
  const value = Cookies.get(key)
  return value ? (JSON.parse(value) as T) : null
}
