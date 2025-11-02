import { cache } from "react"
import { cookies } from "next/headers"

import { getSessionById } from "@/features/session"
import { decrypt } from "@/features/jwt"
import { User } from "@/app/generated/prisma"

export const verifySession = cache(async () => {
  const cookie  = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session) {
    return null
  }

  return {
    id: session.id,
    expiresAt: session.expiresAt,
    user: session.user as User,
  }
})

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session || !session.id) return null

  const data = await getSessionById(session.id as string)

  if (!data || data.expiresAt < new Date()) return null;
  
  return {
    id: data.user.id,
    name: data.user.name,
    email: data.user.email,
    image: data.user.image,
    role: data.user.role,
  };
})
