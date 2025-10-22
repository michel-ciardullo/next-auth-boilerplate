import Navbar from '@/components/navbar'
import Header from '@/components/header'

import ProfileForm from './sections/ProfileForm'
import UpdatePasswordForm from './sections/UpdatePasswordForm'
import TwoFactorForm from './sections/TwoFactorForm'
import BrowserSessions from './sections/BrowserSessions'
import DeleteAccountForm from './sections/DeleteAccountForm'

export default function Profile() {
  return (
    <div className="min-h-full">
      <Navbar />
      <Header>Profile</Header>

      <main className="mx-auto max-w-7xl py-6 space-y-12 divide-y divide-gray-200 dark:divide-gray-800 mt-6">

        <ProfileForm />
        <UpdatePasswordForm />
        <TwoFactorForm />
        <BrowserSessions />
        <DeleteAccountForm />

      </main>
    </div>
  )
}
