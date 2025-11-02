'use server'

import { z } from 'zod'
import { forbidden, unauthorized } from 'next/navigation'

import { verifySession } from '@/features/auth/dal/auth-dal'
import { Role } from '@/app/generated/prisma'
import { updateUser } from '@/features/user'

// Zod schema for validating form input data
const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email'),
  role: z.enum(['USER', 'ADMIN']),
})

export async function updateUserAction(prevState: any, formData: FormData) {
  // User authentication and role verification
  const session = await verifySession()

  // Check if the user is authenticated
  if (!session) {
    // User is not authenticated
    unauthorized()
  }

  // Check if the user has the 'admin' role
  if (session.user.role !== Role.ADMIN) {
    // User is authenticated but does not have the right permissions
    forbidden()
  }

  try {
    // Validate and parse the form data using Zod
    const parsed = updateUserSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
    })

    // Update the user in the database
    await updateUser(prevState.id, {
      name: parsed.name,
      email: parsed.email,
      role: parsed.role === 'ADMIN' ? Role.ADMIN : Role.USER,
    })

    // Return the updated state with success flag
    return {
      ...prevState,
      ...parsed,
      success: true
    }
  } catch (err: any) {
    console.error('❌ updateUser error:', err)

    // Return error details for display in the UI
    return {
      ...prevState,
      error: err?.message || 'Failed to update user',
    }
  }
}
