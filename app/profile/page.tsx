'use server'

import { getServerSession } from 'next-auth'

import Navbar from '@/components/navbar'
import Header from '@/components/header'

import ProfileForm from './sections/ProfileForm'
import UpdatePasswordForm from './sections/UpdatePasswordForm'
import TwoFactorForm from './sections/TwoFactorForm'
import BrowserSessions from './sections/BrowserSessions'
import DeleteAccountForm from './sections/DeleteAccountForm'

import { authOptions } from '@/lib/auth'

export default async function Profile() {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-full">
      <Navbar />
      <Header>Profile</Header>

      <main className="mx-auto max-w-7xl py-6 space-y-12 divide-y divide-gray-200 dark:divide-gray-800 mt-6">

        <ProfileForm user={session!.user} />
        <UpdatePasswordForm userId={session!.user.id} />
        <TwoFactorForm />
        <BrowserSessions />
        <DeleteAccountForm />

      </main>
    </div>
  )
}
