import { cache } from "react"
import { cookies } from "next/headers"

import { getSessionById } from "@/features/session"
import { decrypt } from "@/features/jwt"

export const verifySession = cache(async () => {
  const cookie  = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.sessionId) {
    return {
      userId: null,
      sessionId: null
    }
  }

  return {
    userId: session.userId,
    sessionId: session.sessionId
  }
})

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session.sessionId) return null

  const data = await getSessionById(session.sessionId as string)

  if (!data || data.expiresAt < new Date()) return null;
  
  return {
    id: data.user.id,
    name: data.user.name,
    email: data.user.email,
    image: data.user.image,
  };
})
