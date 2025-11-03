'use client'

import { useActionState, useRef, useState } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

import FormLabel from '@/app/components/form-label'
import FormInput from '@/app/components/form-input'
import FormErrors from '@/app/components/form-errors'
import updateProfile from '../actions/update-profile'

interface ProfileFormProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  }
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfile, {
    data: {
      id: user.id,
      username: user.name || '',
      email: user.email,
      image: user.image ?? '',
    }
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState(user.image ?? '')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 pb-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Profile</h2>
        <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
          This information will be displayed publicly so be careful what you share.
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
              <FormLabel htmlFor="image">Photo</FormLabel>
              <input
                type="file"
                ref={fileInputRef}
                name="image"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="mt-2 flex items-center gap-x-3">
                {preview ? (
                  <Image
                    src={preview}
                    alt="User avatar preview"
                    width={48}
                    height={48}
                    className="rounded-full object-cover size-12"
                  />
                ) : (
                  <UserCircleIcon className="size-12 text-gray-300 dark:text-gray-500" />
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-md bg-white dark:bg-white/10 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-xs hover:bg-gray-50 dark:hover:bg-white/20"
                >
                  Change
                </button>
              </div>
              <FormErrors errors={state?.errors?.properties?.image?.errors} />
            </div>

            <div className="col-span-full">
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormInput id="username" name="username" type="text" className="mt-2" defaultValue={state.data.username} />
              <FormErrors errors={state?.errors?.properties?.username?.errors} />
            </div>

            <div className="col-span-full">
              <FormLabel htmlFor="email">Email address</FormLabel>
              <FormInput id="email" name="email" type="email" autoComplete="email" className="mt-2" defaultValue={state.data.email} />
              <FormErrors errors={state?.errors?.properties?.email?.errors} />
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
              ${isPending ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {isPending ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}
