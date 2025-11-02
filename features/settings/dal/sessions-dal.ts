import { cache } from "react"

import { verifySession } from "@/features/auth/dal/auth-dal"
import { getUserSessionsByUserId } from "@/features/session"

export const getUserSessions = cache(async () => {
  const session = await verifySession()
  if (session?.user.id)
    return getUserSessionsByUserId(session.user.id)
  return null
})
