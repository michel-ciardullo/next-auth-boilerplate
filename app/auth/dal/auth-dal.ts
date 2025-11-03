import { cache } from "react"
import { cookies } from "next/headers"

import { User } from "@/app/generated/prisma"
import { getSessionById } from "@/app/session/data/session-data"
import { decrypt } from "@/app/lib/jwt"

export const verifySession = cache(async () => {
  const cookie  = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session)
    return null

  const expiresAt = session.expiresAt as Date
  if (expiresAt < new Date())
    return null;

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
  if (!data) return null;
  
  return {
    id: data.user.id,
    name: data.user.name,
    email: data.user.email,
    image: data.user.image,
    role: data.user.role,
  };
})
