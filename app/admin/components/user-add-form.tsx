'use client'

import { useActionState } from 'react'

import { createUserAction } from '../actions/add-user'
import UserForm from './user-form'

export default function UserAddForm() {
  const [state, formAction, isPending] = useActionState(createUserAction, null)
  return (
    <UserForm state={state} action={formAction} isPending={isPending} />
  )
}
