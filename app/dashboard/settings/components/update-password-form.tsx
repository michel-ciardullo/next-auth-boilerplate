'use client'

import { useActionState } from 'react'

import FormLabel from '@/app/components/form-label'
import FormInput from '@/app/components/form-input'
import FormErrors from '@/app/components/form-errors'
import updatePassword from '../actions/update-password'

interface UpdatePasswordFormProps {
  userId: string
}

export default function UpdatePasswordForm({ userId }: UpdatePasswordFormProps) {
  const [state, formAction, isPending] = useActionState(updatePassword, {
    data: { id: userId }
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 pb-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Update Password</h2>
        <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
          Make sure your new password is strong and secure. You can update it here.
        </p>
      </div>
      <form action={formAction} className="bg-white dark:bg-gray-800 md:rounded-xl ring ring-gray-900/5 md:col-span-2 md:mr-6">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

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

            <div className="col-span-full">
              <FormLabel htmlFor="currentPassword">Current Password</FormLabel>
              <FormInput
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="Enter current password"
                className="mt-2"
                required
              />
              <FormErrors errors={state?.errors?.properties?.currentPassword?.errors} />
            </div>

            <div className="col-span-full">
              <FormLabel htmlFor="newPassword">New Password</FormLabel>
              <FormInput
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                className="mt-2"
                required
              />
              <FormErrors errors={state?.errors?.properties?.newPassword?.errors} />
            </div>

            <div className="col-span-full">
              <FormLabel htmlFor="confirmPassword">Confirm New Password</FormLabel>
              <FormInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="mt-2"
                required
              />
              <FormErrors errors={state?.errors?.properties?.confirmPassword?.errors} />
            </div>

          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/25 flex items-center justify-end gap-x-6 border-t border-gray-900/10 dark:border-white/10 px-4 py-4 md:px-8">
          <button
            type="submit"
            disabled={isPending}
            className={`flex justify-center rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs 
              hover:bg-indigo-500 dark:hover:bg-indigo-400 
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500
              ${isPending ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>

      </form>
    </div>
  )
}
