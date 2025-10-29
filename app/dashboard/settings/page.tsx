'use server'

import Navbar from '@/components/navbar'
import Header from '@/components/header'
import Footer from '@/components/footer'
import {
  ProfileForm,
  UpdatePasswordForm,
  TwoFactorForm,
  BrowserSessions,
  DeleteAccountForm
} from '@/features/settings'
import { getUser } from '@/features/auth/dal/auth-dal'

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
