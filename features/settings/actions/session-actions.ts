'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

import { decrypt } from '@/features/jwt'
import signOut from '@/features/auth/actions/logout-action'
import { deleteOtherSessions, deleteSessionById, getSessionById } from '@/features/session'

export async function logoutSession(sessionId: string) {
  const cookie = (await cookies()).get('session')?.value
  const current = await decrypt(cookie)
  if (!current?.sessionId) return

  // 🔒 Supprime uniquement si la session appartient au même user
  const currentSession = await getSessionById(current?.sessionId as string)

  const target = await getSessionById(sessionId)

  if (!currentSession || !target || target.userId !== currentSession.userId) {
    throw new Error('Unauthorized')
  }

  if (currentSession.id === current.sessionId) {
    await signOut()
    return
  }

  await deleteSessionById(sessionId)

  revalidatePath('/dashboard/settings')
}

export async function logoutOtherSessions() {
  const cookie = (await cookies()).get('session')?.value
  const current = await decrypt(cookie)
  if (!current?.sessionId) return

  const currentSession = await getSessionById(current.sessionId as string)
  if (!currentSession) return

  await deleteOtherSessions(currentSession.userId, currentSession.id)

  revalidatePath('/dashboard/settings')
}
