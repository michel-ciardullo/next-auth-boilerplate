'use client'

import { useActionState, useEffect } from 'react'

import Label from '@/components/ui/form/label'
import { deleteAccount } from '@/features/settings'
import { logoutAction } from '@/features/auth'

interface DeleteAccountFormProps {
  userId: string
}

export default function DeleteAccountForm({ userId }: DeleteAccountFormProps) {
  const [state, formAction, isPending] = useActionState(deleteAccount, { userId })

  useEffect(() => {
    if (state.success) {
      logoutAction()
    }
  }, [state.success])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Delete Account</h2>
        <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 md:rounded-xl ring ring-gray-900/5 md:col-span-2 px-4 py-6 sm:p-8 md:mr-6">
        <form action={formAction} className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            If you are sure, type <span className="font-semibold text-gray-900 dark:text-white">DELETE</span> in the box below to confirm.
          </p>

          {state?.errors?.server?.errors && state.errors.server.errors.length > 0 && (
            <div>
              <span className="text-sm/6 text-red-600 dark:text-red-400 mr-auto">
                {state.errors.server.errors[0]}
              </span>
            </div>
          )}
          
          <div>
            <Label htmlFor="confirmDelete">Confirm Deletion</Label>
            <input
              id="confirmDelete"
              name="confirmDelete"
              type="text"
              required
              placeholder="Type DELETE to confirm"
              className="mt-2 block w-full rounded-md bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 px-3 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-600 dark:focus:outline-indigo-500 sm:text-sm/6"
            />
            {state?.errors?.properties?.confirmDelete?.errors.length && <small className="text-red-600 dark:text-red-400 block mt-1">{state?.errors?.properties.confirmDelete.errors[0]}</small>}
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-red-600 dark:bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 dark:hover:bg-red-400 sm:ml-3 sm:w-auto"
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
