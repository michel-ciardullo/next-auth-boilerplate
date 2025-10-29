import { cache } from "react"

import { verifySession } from "@/features/auth/dal/auth-dal"
import { getUserSessionsByUserId } from "@/features/session"

export const getUserSessions = cache(async () => {
  const session = await verifySession()
  if (session.userId)
    return getUserSessionsByUserId(session.userId as string)
  return null
})
