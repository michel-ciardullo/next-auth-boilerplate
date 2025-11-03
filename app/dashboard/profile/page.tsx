'use server'

import Navbar from '@/app/components/navbar'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import { getUser } from '@/app/auth/dal/auth-dal'

export default async function Profile() {
  const user = (await getUser())!

  return (
    <div className="min-h-full">
      <Navbar />
      <Header>Profile</Header>

      <main className="mx-auto max-w-7xl py-12 px-6">

        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
            Profile Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
            Personal details and background.
          </p>
        </div>

        <div className="mt-6 border-t border-gray-200 dark:border-gray-800">
          <dl className="divide-y divide-gray-200 dark:divide-gray-800">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium text-gray-900 dark:text-white">Full name</dt>
              <dd className="mt-1 text-sm text-gray-700 dark:text-gray-300 sm:col-span-2 sm:mt-0">
                {user.name}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium text-gray-900 dark:text-white">Email address</dt>
              <dd className="mt-1 text-sm text-gray-700 dark:text-gray-300 sm:col-span-2 sm:mt-0">
                {user.email}
              </dd>
            </div>

          </dl>
        </div>

      </main>

      <Footer />
    </div>
  )
}
