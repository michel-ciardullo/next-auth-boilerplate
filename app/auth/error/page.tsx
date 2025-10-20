'use client'

import { useSearchParams, useRouter } from 'next/navigation'

export default function AuthError() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const errorMessages: Record<string, string> = {
    Configuration: 'There is a problem with the server configuration.',
    AccessDenied: 'Access denied — you do not have permission to sign in.',
    CredentialsSignin: 'Invalid email or password. Please try again.',
    OAuthAccountNotLinked: 'Your account is already linked to another provider.',
    Default: 'An unexpected error occurred. Please try again later.',
  }

  const message = error ? (errorMessages[error] || errorMessages.Default) : errorMessages.Default

  return (
    <main className="grid min-h-full place-items-center bg-white dark:bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400">Error</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Authentication Error
        </h1>
        <p className="mt-6 text-lg font-medium text-gray-600 dark:text-gray-300 sm:text-xl/8">
          {message}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={() => router.push('/')}
            className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500"
          >
            Go back home
          </button>
          <a href="/support" className="text-sm font-semibold text-gray-900 dark:text-white">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  )
}
