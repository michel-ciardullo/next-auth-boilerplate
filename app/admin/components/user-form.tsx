'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PlusIcon, PencilIcon } from '@heroicons/react/24/solid'

import FormLabel from '@/app/components/form-label'
import FormInput from '@/app/components/form-input'
import FormSelect from '@/app/components/form-select'
import FormErrors from '@/app/components/form-errors'
import { Role } from '@/app/generated/prisma'

interface UserFormProps {
  state: {
    data?: {
      id?: string
      name?: string
      email?: string
      role?: string
    }
    success?: boolean
    error?: string
    errors?: {
      properties?: {
        name?: { errors: string[] }
        email?: { errors: string[] }
        role?: { errors: string[] }
      }
    }
  } | null
  action: (formData: FormData) => void
  isPending: boolean
}

export default function UserForm({ state, action, isPending }: UserFormProps) {
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      router.push('/admin/users')
    }
  }, [state?.success, router])

  return (
    <form action={action} className="space-y-6">

      {state?.error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}

      <div>
        <FormLabel htmlFor="name">Name</FormLabel>
        <FormInput
          type="text"
          name="name"
          id="name"
          required
          placeholder="John Doe"
          className="mt-1"
          autoFocus
          defaultValue={state?.data?.name || ''}
        />
        <FormErrors errors={state?.errors?.properties?.name?.errors} />
      </div>

      <div>
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormInput
          type="email"
          name="email"
          id="email"
          required
          placeholder="user@example.com"
          className="mt-1"
          defaultValue={state?.data?.email || ''}
        />
        <FormErrors errors={state?.errors?.properties?.email?.errors} />
      </div>

      <div>
        <FormLabel htmlFor="role">Role</FormLabel>
        <FormSelect
          defaultValue={state?.data?.role || Role.USER}
          options={[
            { value: Role.USER, label: 'User' },
            { value: Role.ADMIN, label: 'Admin' },
          ]}
          name="role"
          id="role"
        />
        <FormErrors errors={state?.errors?.properties?.role?.errors} />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 disabled:opacity-50"
        >
          {!state?.data?.id && <PlusIcon className="h-5 w-5" />}
          {state?.data?.id && <PencilIcon className="h-5 w-5" />}
          {isPending
            ? `${state?.data?.id ? 'Updating' : 'Creating'}...'`
            : `${state?.data?.id ? 'Update' : 'Create'} User`}
        </button>
      </div>
    </form>
  )
}
