'use server'

import Link from 'next/link'
import { PencilIcon, EyeIcon } from '@heroicons/react/24/outline'

import { findUserMany } from '@/app/user'
import { Pagination } from '@/app/components/pagination'

import { deleteUserById } from '../actions/delete-user'
import DeleteUserModal from './user-delete-modal'

const PER_PAGE = 10

export default async function UserTable({ page }: { page: number }) {
  const { users, total } = await findUserMany(page, PER_PAGE)

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-left">
        <thead className="">
          <tr>
            <th className="px-4 sm:px-0 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Name
            </th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Role
            </th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Status
            </th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row" className="min-w-[200px] px-4 sm:pl-0 flex items-center py-4 whitespace-nowrap text-gray-900 dark:text-white">
                <img
                  alt={user.name || 'User'}
                  src={
                    user.image ||
                    'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || 'User')
                  }
                  className="w-10 h-10 rounded-full"
                />
                <div className="ps-3 flex-shrink-0">
                  <div className="text-base font-semibold">{user.name}</div>
                  <div className="font-normal text-gray-500 dark:text-gray-400">{user.email}</div>
                </div>  
              </th>
              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{user.role}</td>
              <td className="px-4 py-4">
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
              <td className="px-4 sm:pr-0 py-4">
                <div className="flex gap-x-3 justify-end">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </Link>
                  <Link
                    href={`/admin/users/${user.id}/edit`}
                    className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </Link>
                  <DeleteUserModal
                    userId={user.id}
                    userName={user.name || ''}
                    deleteAction={deleteUserById}
                  />
                </div>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        page={page}
        total={total}
        perPage={PER_PAGE}
      />
    </>
  )
}
