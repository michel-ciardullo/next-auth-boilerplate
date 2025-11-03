'use client'

import { useActionState, useEffect } from 'react'

import FormLabel from '@/app/components/form-label'
import logoutAction from '@/app/auth/actions/logout-action'
import deleteAccount from '../actions/delete-account'
import FormInput from '@/app/components/form-input'
import FormErrors from '@/app/components/form-errors'

interface DeleteAccountFormProps {
  userId: string
}

export default function DeleteAccountForm({ userId }: DeleteAccountFormProps) {
  const [state, formAction, isPending] = useActionState(deleteAccount, {
    data: { userId }
  })

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

          {state?.message && (
            <div className="col-span-full">
              <span className="text-sm/6 text-gray-600 dark:text-gray-400">
                {state?.message}
              </span>
            </div>
          )}

          {state?.error && (
            <div className="col-span-full">
              <span className="text-sm/6 text-red-600 dark:text-red-400">
                {state?.error}
              </span>
            </div>
          )}

          <div>
            <FormLabel htmlFor="confirmDelete">Confirm Deletion</FormLabel>
            <FormInput
              id="confirmDelete"
              name="confirmDelete"
              type="text"
              required
              placeholder="Type DELETE to confirm"
              className="mt-2"
            />
            <FormErrors errors={state?.errors?.properties?.confirmDelete?.errors} />
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={isPending}
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
