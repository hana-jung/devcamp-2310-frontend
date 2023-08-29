import { useRouter } from "next/router"
import { useEffect } from "react"
import { useUserStore } from "../../src/stores/userStore"

const useRequireAuth = () => {
  const { user } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])
}

export default useRequireAuth
