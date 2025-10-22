'use client'

import Label from '@/components/ui/form/label'
import Input from '@/components/ui/form/input'

export default function UpdatePasswordForm() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 pb-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Update Password</h2>
        <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
          Make sure your new password is strong and secure. You can update it here.
        </p>
      </div>
      <form className="bg-white dark:bg-gray-800 md:rounded-xl ring ring-gray-900/5 md:col-span-2 md:mr-6">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="col-span-full">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="Enter current password"
                className="mt-2"
              />
            </div>

            <div className="col-span-full">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                className="mt-2"
              />
            </div>

            <div className="col-span-full">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="mt-2"
              />
            </div>

          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 dark:border-white/10 px-4 py-4 md:px-8">
          <button type="button" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  )
}
