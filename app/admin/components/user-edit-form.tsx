'use client'

import { useActionState } from 'react'

import { User } from '@/app/generated/prisma'
import { updateUserAction } from '../actions/update-user'
import UserForm from './user-form'

interface UserEditFormProps {
  data: User
}

export default function UserEditForm({ data }: UserEditFormProps) {
  const [state, formAction, isPending] = useActionState(updateUserAction, {
    data: {
      id: data.id,
      name: data.name || '',
      email: data.email,
      role: data.role as string,
    }
  })
  return (
    <UserForm state={state} action={formAction} isPending={isPending} />
  )
}
