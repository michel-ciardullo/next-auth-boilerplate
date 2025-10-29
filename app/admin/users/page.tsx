'use client'

import { useState } from 'react'
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline'

export default function AdminUsers() {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Mark Brown', email: 'mark@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Lina Moore', email: 'lina@example.com', role: 'User', status: 'Suspended' },
  ])

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 sm:ml-64 mt-2 sm:mt-0">
      <div className="p-4 mt-14 space-y-8">
        {/* === HEADER === */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Users</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage user accounts, roles, and permissions.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
          >
            <PlusIcon className="h-5 w-5" />
            Add User
          </button>
        </header>

        {/* === SEARCH === */}
        <div className="flex justify-end">
          <input
            type="text"
            placeholder="Search for a user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* === USERS TABLE === */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
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
              {filtered.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.role}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-3 justify-end">
                    <button className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button className="text-gray-500 hover:text-red-600 dark:hover:text-red-400">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
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
        </div>

        {/* === FOOTER === */}
        <footer className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6">
          © {new Date().getFullYear()} – User Administration
        </footer>
      </div>
    </div>
  )
}
