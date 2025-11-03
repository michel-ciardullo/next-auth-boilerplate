import { cache } from "react"

import { verifySession } from "@/app/auth/dal/auth-dal"
import { getUserSessionsByUserId } from "@/app/session/data/session-data"

export const getUserSessions = cache(async () => {
  const session = await verifySession()
  if (session?.user.id)
    return getUserSessionsByUserId(session.user.id)
  return null
})
