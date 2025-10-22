'use client'

import { UserCircleIcon } from '@heroicons/react/24/solid'

import Label from '@/components/ui/form/label'
import Input from '@/components/ui/form/input'

export default function ProfileForm() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 pb-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Profile</h2>
        <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">This information will be displayed publicly so be careful what you share.</p>
      </div>
      <form className="bg-white dark:bg-gray-800 md:rounded-xl ring ring-gray-900/5 md:col-span-2 md:mr-6">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="col-span-full">
              <Label htmlFor="photo">Photo</Label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon aria-hidden="true" className="size-12 text-gray-300 dark:text-gray-500" />
                <button
                  type="button"
                  className="rounded-md bg-white dark:bg-white/10 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-xs inset-ring inset-ring-gray-300 dark:inset-ring-white/5 hover:bg-gray-50 dark:hover:bg-white/20"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="col-span-full">
              <Label htmlFor="username">Username</Label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white dark:bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:focus-within:outline-indigo-500">
                  <div className="shrink-0 text-base text-gray-500 dark:text-gray-400 select-none sm:text-sm/6">workcation.com/</div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="janesmith"
                    className="block min-w-0 grow bg-white dark:bg-transparent py-1.5 pr-3 pl-1 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
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
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
