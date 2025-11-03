'use server'

import Navbar from '@/app/components/navbar'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'

import { getUser } from '@/app/auth/dal/auth-dal'
import ProfileForm from './components/profile-form'
import UpdatePasswordForm from './components/update-password-form'
import TwoFactorForm from './components/two-factor-form'
import BrowserSessions from './components/browser-sessions'
import DeleteAccountForm from './components/delete-account-form'

export default async function Settings() {
  const user = await getUser()

  return (
    <div className="min-h-full">
      <Navbar />
      <Header>Account Settings</Header>

      <main className="mx-auto max-w-7xl py-6 space-y-12 divide-y divide-gray-200 dark:divide-gray-800 mt-6">

        <ProfileForm user={user!} />
        <UpdatePasswordForm userId={user!.id} />
        <TwoFactorForm />
        <BrowserSessions />
        <DeleteAccountForm userId={user!.id} />

      </main>

      <Footer />
    </div>
  )
}
