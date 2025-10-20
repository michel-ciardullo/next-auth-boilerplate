'use client'

import { useSession } from 'next-auth/react'
import Navbar from '@/components/navbar'
import Header from '@/components/header'
import Main from '@/components/main'
import Link from 'next/link'

export default function Dashboard() {
  const { data: session } = useSession()

  return (
    <div className="min-h-full">
      <Navbar />
      <Header>Dashboard</Header>

      <Main>
        <section className="max-w-5xl mx-auto py-12 px-6">
          {session?.user ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Welcome back, {session.user.name || 'User'} 👋
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Here’s an overview of your account and activity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Profile</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    View and update your account information.
                  </p>
                  <Link href="/profile" className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                    Manage profile →
                  </Link>
                </div>

                <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Projects</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Track your ongoing work and view project analytics.
                  </p>
                  <Link href="/projects" className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                    View projects →
                  </Link>
                </div>

                <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Reports</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Access system metrics, recent logs, and activity reports.
                  </p>
                  <Link href="/reports" className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                    See reports →
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You need to be logged in to access the dashboard.
              </p>
              <Link
                href="/auth/login"
                className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                Go to Login
              </Link>
            </div>
          )}
        </section>
      </Main>
    </div>
  )
}
