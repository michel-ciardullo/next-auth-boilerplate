'use client'

import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'

import Label from '@/app/components/ui/form/label'
import Input from '@/app/components/ui/form/input'
import { Role, User } from '@/app/generated/prisma'

import { updateUserAction } from '../actions/update-user'
import { createUserAction } from '../actions/add-user'

export default function UserForm({
  data,
}: {
  data?: User | null,
}) {
  const [state, formAction, isPending] = useActionState(data?.id ? updateUserAction : createUserAction, data)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      router.push('/admin/users')
    }
  }, [state?.success])

  return (
    <form action={formAction} className="space-y-6">

      {state?.error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          required
          placeholder="John Doe"
          className="mt-1"
          autoFocus
          defaultValue={state?.name || ''}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          required
          placeholder="user@example.com"
          className="mt-1"
          defaultValue={state?.email || ''}
        />
      </div>

      <div>
        <Label htmlFor="role">Role</Label>
        <select
          name="role"
          id="role"
          defaultValue={state?.role || Role.USER}
          className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 disabled:opacity-50"
        >
          {!state?.id && <PlusIcon className="h-5 w-5" />}
          {isPending
            ? `${state?.id ? 'Updating' : 'Creating'}...'`
            : `${state?.id ? 'Update' : 'Create'} User`}
        </button>
      </div>
    </form>
  )
}
