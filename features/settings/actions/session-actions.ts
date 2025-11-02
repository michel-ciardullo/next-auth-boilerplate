'use server'

import { revalidatePath } from 'next/cache'
import { forbidden, unauthorized } from 'next/navigation'

import { verifySession } from '@/features/auth/dal/auth-dal'
import { Role } from '@/app/generated/prisma'
import signOut from '@/features/auth/actions/logout-action'
import { deleteOtherSessions, deleteSessionById, getSessionById } from '@/features/session'

/**
 * Logs out a specific session by its ID.
 * Only the owner of the session can log it out.
 */
export async function logoutSession(sessionId: string) {
  // User authentication and role verification
  const session = await verifySession()

  // Check if the user is authenticated
  if (!session) {
    // User is not authenticated
    unauthorized()
  }

  // Check if the user has either 'USER' or 'ADMIN' role
  if (session.user.role !== Role.USER && session.user.role !== Role.ADMIN) {
    // User is authenticated but does not have permission to delete this account (403)
    forbidden()
  }

  // Optional: ensure the user's email is verified before allowing deletion
  if (session.user.emailVerifiedAt === null) {
    // User is authenticated but their email is not verified — deny deletion
    forbidden()
  }

  // Fetch the current session from the database
  const currentSession = await getSessionById(session?.id as string)

  // Fetch the target session to be logged out
  const target = await getSessionById(sessionId)

  // Ensure the target session exists and belongs to the same user
  if (!currentSession || !target || target.userId !== currentSession.userId) {
    unauthorized()
  }

  // If the target session is the current session, perform a full sign-out
  if (currentSession.id === session.id) {
    await signOut()
    return
  }

  // Delete the specified session
  await deleteSessionById(sessionId)

  // Revalidate the dashboard settings page to reflect session changes
  revalidatePath('/dashboard/settings')
}

/**
 * Logs out all other sessions for the current user except the active one.
 */
export async function logoutOtherSessions() {
  // User authentication and role verification
  const session = await verifySession()

  // Check if the user is authenticated
  if (!session) {
    // User is not authenticated
    unauthorized()
  }

  // Check if the user has either 'USER' or 'ADMIN' role
  if (session.user.role !== Role.USER && session.user.role !== Role.ADMIN) {
    // User is authenticated but does not have permission to delete this account (403)
    forbidden()
  }

  // Optional: ensure the user's email is verified before allowing deletion
  if (session.user.emailVerifiedAt === null) {
    // User is authenticated but their email is not verified — deny deletion
    forbidden()
  }

  // Fetch the current session from the database
  const currentSession = await getSessionById(session.id as string)
  if (!currentSession) return

  // Delete all other sessions for this user except the current one
  await deleteOtherSessions(currentSession.userId, currentSession.id)

  // Revalidate the dashboard settings page to reflect session changes
  revalidatePath('/dashboard/settings')
}
