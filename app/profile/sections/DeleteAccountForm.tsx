'use cient'

import Label from '@/components/ui/form/label'

export default function DeleteAccountForm() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Delete Account</h2>
        <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 md:rounded-xl ring ring-gray-900/5 md:col-span-2 px-4 py-6 sm:p-8 md:mr-6">
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            If you are sure, type <span className="font-semibold text-gray-900 dark:text-white">DELETE</span> in the box below to confirm.
          </p>
          
          <div>
            <Label htmlFor="confirm-delete">Confirm Deletion</Label>
            <input
              id="confirm-delete"
              name="confirm-delete"
              type="text"
              placeholder="Type DELETE to confirm"
              className="mt-2 block w-full rounded-md bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 px-3 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-600 dark:focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="rounded-md bg-red-600 dark:bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 dark:focus-visible:outline-red-500"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
