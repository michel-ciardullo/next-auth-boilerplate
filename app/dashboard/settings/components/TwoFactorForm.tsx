'use client'

import Label from '@/app/components/ui/form/label'
import Input from '@/app/components/ui/form/input'

export default function TwoFactorForm() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 pb-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h2>
        <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
          Enhance your account security by enabling two-factor authentication. You will need to use an authentication app or SMS code.
        </p>
      </div>
      <form className="bg-white dark:bg-gray-800 md:rounded-xl ring ring-gray-900/5 md:col-span-2 md:mr-6">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="col-span-full">
              <Label htmlFor="enable2FA">Enable Two-Factor Authentication</Label>
              <div className="mt-2 flex items-center gap-x-3">
                <input
                  id="enable2FA"
                  name="enable2FA"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Activate 2FA for your account</span>
              </div>
            </div>

            <div className="col-span-full">
              <Label htmlFor="authAppCode">Authentication App Code</Label>
              <Input
                id="authAppCode"
                name="authAppCode"
                type="text"
                placeholder="Enter code from your authentication app"
                className="mt-2"
              />
            </div>

          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/25 flex items-center justify-end gap-x-6 border-t border-gray-900/10 dark:border-white/10 px-4 py-4 md:px-8">
          <button type="button" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  )
}
