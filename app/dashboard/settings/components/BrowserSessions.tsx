'use server'

import { verifySession } from "@/app/auth/dal/auth-dal"
import { logoutOtherSessions, logoutSession } from "../actions/session-actions"
import { getUserSessions } from "../dal/sessions-dal"

function formatTimeAgo(date: Date): string {
  const diff = Date.now() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`
  return 'just now'
}

export default async function BrowserSessions() {
  const userSessions = await getUserSessions()
  if (!userSessions?.length) return null

  // Get the current session ID
  const currentSession = await verifySession()
  const currentSessionId = currentSession?.id

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 pb-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Browser Sessions</h2>
        <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
          Manage your active sessions. You can log out from other devices for security purposes.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 md:rounded-xl ring ring-gray-900/5 md:col-span-2 px-4 py-6 sm:p-8 md:mr-6">
        <div className="space-y-4">

          {userSessions.map((session) => {
            const isCurrent = session.id === currentSessionId
            return (
              <form key={session.id} action={logoutSession.bind(null, session.id)}>
                <div className="flex items-center justify-between rounded-md border border-gray-200 dark:border-white/10 p-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      {session.userAgent || "Unknown browser"}
                      {isCurrent && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                          Current Session
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Last active: {formatTimeAgo(session.updatedAt)} • IP: {session.ipAddress || "N/A"}
                    </p>
                  </div>
                  {!isCurrent && (
                    <button
                      type="submit"
                      className="text-sm font-semibold text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Log out
                    </button>
                  )}
                </div>
              </form>
            )
          })}

          {userSessions.length > 1 && (
            <form action={logoutOtherSessions}>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md bg-red-600 dark:bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 dark:hover:bg-red-400 sm:ml-3"
                >
                  Log out from all other sessions
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
