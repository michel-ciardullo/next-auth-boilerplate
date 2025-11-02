'use server'

import Link from 'next/link'
import { PencilIcon } from '@heroicons/react/24/outline'
import { findUserMany } from '@/features/user'
import { deleteUserById } from '../actions/delete-user'
import DeleteUserModal from './user-delete-modal'
import { EyeIcon } from '@heroicons/react/24/solid'

export default async function AdminUsers() {
  const users = await findUserMany()

  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Role
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Status
          </th>
          <th className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
        {users.map((user) => (
          <tr key={user.id}>
            <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{user.name}</td>
            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.role}</td>
            <td className="px-6 py-4">
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  user.emailVerifiedAt
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}
              >
                {user.emailVerifiedAt ? 'Active' : 'Pending'}
              </span>
            </td>
            <td className="px-6 py-4 flex gap-3 justify-end">
              <Link
                href={`/admin/users/${user.id}`}
                className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <EyeIcon className="h-5 w-5" />
              </Link>
              <Link href={`/admin/users/${user.id}/edit`} className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                <PencilIcon className="h-5 w-5" />
              </Link>
              <DeleteUserModal
                userId={user.id}
                userName={user.name || ''}
                deleteAction={deleteUserById}
              />
            </td>
          </tr>
        ))}
        {users.length === 0 && (
          <tr>
            <td
              colSpan={5}
              className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
