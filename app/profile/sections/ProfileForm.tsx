'use client'

import { useActionState, useEffect } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { User } from 'next-auth'

import Label from '@/components/ui/form/label'
import Input from '@/components/ui/form/input'

import updateProfile from '@/actions/update-profile'
import { classNames } from '@/utils/functions'
import { useSession } from 'next-auth/react'

interface ProfileFormProps {
  user: User
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfile, {
    userId: user.id,
    username: user.name,
    email: user.email,
    success: false
  })

  const { update: updateSession } = useSession()

  useEffect(() => {
    if (state.success) {
      updateSession({ name: state.username, email: state.email })
    }
  }, [state.success, state.username, state.email])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 pb-10">

      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Profile</h2>
        <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">This information will be displayed publicly so be careful what you share.</p>
      </div>

      <form action={formAction} className="bg-white dark:bg-gray-800 md:rounded-xl ring ring-gray-900/5 md:col-span-2 md:mr-6">
        <input type="hidden" name="userId" />

        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="col-span-full">
              {state?.errors?.server?.errors && state.errors.server.errors.length > 0 && (
                <span className="text-sm/6 text-red-600 dark:text-red-400 mr-auto">
                  {state.errors.server.errors[0]}
                </span>
              )}
            </div>

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
              <Input
                id="username"
                name="username"
                type="text"
                className="mt-2"
                defaultValue={state.username}
                placeholder="janesmith"
              />
              {state?.errors?.properties?.username?.errors.length && <small className="text-red-600 dark:text-red-400 block mt-1">{state?.errors?.properties.username.errors[0]}</small>}
            </div>

            <div className="col-span-full">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="mt-2"
                defaultValue={state.email}
              />
              {state?.errors?.properties?.email?.errors.length && <small className="text-red-600 dark:text-red-400 block mt-1">{state?.errors?.properties.email.errors[0]}</small>}
            </div>

          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 dark:border-white/10 px-4 py-4 md:px-8">
          <button
            type="submit"
            disabled={isPending}
            className={classNames(
              'rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500',
              isPending ? "opacity-60 cursor-not-allowed" : ""
            )}
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>

      </form>

    </div>
  )
}
