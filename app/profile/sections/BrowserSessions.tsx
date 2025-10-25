'use client'

export default function BrowserSessions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 pb-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Browser Sessions</h2>
        <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
          Manage your active sessions. You can log out from other devices for security purposes.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 md:rounded-xl ring ring-gray-900/5 md:col-span-2 px-4 py-6 sm:p-8 md:mr-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-md border border-gray-200 dark:border-white/10 p-4">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Chrome on macOS</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Last active: 2 hours ago • IP: 192.168.1.10</p>
            </div>
            <button
              type="button"
              className="text-sm font-semibold text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
            >
              Log out
            </button>
          </div>
          <div className="flex items-center justify-between rounded-md border border-gray-200 dark:border-white/10 p-4">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Firefox on Windows</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Last active: 1 day ago • IP: 192.168.1.15</p>
            </div>
            <button
              type="button"
              className="text-sm font-semibold text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
            >
              Log out
            </button>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 dark:bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 dark:hover:bg-red-400 sm:ml-3 sm:w-auto"
            >
              Log out from all other sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
