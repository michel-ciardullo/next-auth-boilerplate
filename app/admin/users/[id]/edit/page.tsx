'use server'

import { ButtonBack } from '@/features/admin'
import { getUserById } from '@/features/user'
import UserForm from '@/features/admin/components/user-form'

export default async function AdminUserEdit({
  params
}: Readonly<{
  params: Promise<{
    id: string
  }>
}>) {
  const { id: userId } = await params
  const user = await getUserById(userId)

  return (
    <div className="p-4 sm:p-8 sm:ml-64 mt-16 sm:mt-14 space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit User</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Update user account information, roles, and permissions.
          </p>
        </div>
        <ButtonBack />
      </header>

      {/* Form */}
      <UserForm data={user} />

      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6">
        © {new Date().getFullYear()} – Edit User
      </footer>
    </div>
  )
}
