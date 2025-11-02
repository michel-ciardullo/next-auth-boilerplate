'use server'

import { z } from 'zod'

import { Role } from '@/app/generated/prisma'
import { updateUser } from '@/features/user'

// Schema de validation
const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email'),
  role: z.enum(['USER', 'ADMIN']),
})

export async function updateUserAction(prevState: any, formData: FormData) {
  try {
    const parsed = updateUserSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
    })

    await updateUser(prevState.id, {
      name: parsed.name,
      email: parsed.email,
      role: parsed.role === 'ADMIN' ? Role.ADMIN : Role.USER,
    })

    return {
      ...prevState,
      ...parsed,
      success: true
    }
  } catch (err: any) {
    console.error('❌ updateUser error:', err)
    return {
      ...prevState,
      error: err?.message || 'Failed to update user',
    }
  }
}
