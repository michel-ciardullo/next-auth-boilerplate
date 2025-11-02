'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { User } from '@/app/generated/prisma'

export default function AdminUserShow() {
  const params = useParams<{ id: string }>()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/${params.id}`)
        if (!res.ok) throw new Error('Failed to fetch user')
        const data = await res.json()
        setUser(data)
      } catch (err) {
        console.error(err)
        setError('Unable to load user.')
      } finally {
        setLoading(false)
      }
    }
    if (params.id) getUser()
  }, [params.id])

  if (loading)
    return (
      <div className="sm:ml-64 p-8 text-gray-500 dark:text-gray-400 animate-pulse">
        Loading user details...
      </div>
    )

  if (error)
    return (
      <div className="sm:ml-64 p-8 text-red-500">
        {error}
      </div>
    )

  if (!user)
    return (
      <div className="sm:ml-64 p-8 text-gray-500 dark:text-gray-400">
        User not found.
      </div>
    )

  return (
    <div className="p-4 sm:p-8 sm:ml-64 mt-16 sm:mt-14 space-y-8">
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {user.name || 'Unnamed User'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/users/${params.id}/edit`}
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
          >
            <PencilIcon className="h-5 w-5" />
            Edit
          </Link>
          <button
            className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-red-500"
          >
            <TrashIcon className="h-5 w-5" />
            Delete
          </button>
        </div>
      </header>

      {/* DETAILS CARD */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <dl className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="py-4 flex justify-between text-sm">
            <dt className="text-gray-500 dark:text-gray-400">Name</dt>
            <dd className="text-gray-900 dark:text-gray-100">{user.name}</dd>
          </div>
          <div className="py-4 flex justify-between text-sm">
            <dt className="text-gray-500 dark:text-gray-400">Email</dt>
            <dd className="text-gray-900 dark:text-gray-100">{user.email}</dd>
          </div>
          <div className="py-4 flex justify-between text-sm">
            <dt className="text-gray-500 dark:text-gray-400">Role</dt>
            <dd className="text-gray-900 dark:text-gray-100">{user.role}</dd>
          </div>
          <div className="py-4 flex justify-between text-sm">
            <dt className="text-gray-500 dark:text-gray-400">Status</dt>
            <dd>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  user.emailVerifiedAt
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}
              >
                {user.emailVerifiedAt ? 'Active' : 'Pending'}
              </span>
            </dd>
          </div>
          <div className="py-4 flex justify-between text-sm">
            <dt className="text-gray-500 dark:text-gray-400">Created At</dt>
            <dd className="text-gray-900 dark:text-gray-100">
              {new Date(user.createdAt).toLocaleString()}
            </dd>
          </div>
          <div className="py-4 flex justify-between text-sm">
            <dt className="text-gray-500 dark:text-gray-400">Last Updated</dt>
            <dd className="text-gray-900 dark:text-gray-100">
              {new Date(user.updatedAt).toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>

      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6">
        © {new Date().getFullYear()} – User Details
      </footer>
    </div>
  )
}
