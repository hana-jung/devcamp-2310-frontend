import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useUserStore } from "src/stores/user-store/userStore"

const useAccessAuth = () => {
  const { accessToken } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    if (!accessToken) {
      const currentPath = router.asPath
      router.replace(`/login?next=${encodeURIComponent(currentPath)}`)
    }
  }, [accessToken, router])
}

export default useAccessAuth
