'use server'

import { treeifyError, z } from 'zod'
import { forbidden, unauthorized } from 'next/navigation'

import { Role } from '@/app/generated/prisma'
import { updateUser } from '@/app/user'
import { verifySession } from '@/app/auth/dal/auth-dal'

// Zod schema for validating form input data
const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email'),
  role: z.enum(['USER', 'ADMIN']),
})

type UpdateUserState = {
  data?: {
    id: string
    name: string
    email: string
    role: string
  },
  success?: boolean
  errors?: {
    properties?: {
      name?: { errors: string[] }
      email?: { errors: string[] }
      role?: { errors: string[] }
    }
  }
  message?: string
  error?: string
}

export async function updateUserAction(
  prevState: UpdateUserState,
  formData: FormData
): Promise<UpdateUserState> {
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

  // Extract and validate fields from the form
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const role = (formData.get('role') as string) || Role.USER

  const id = prevState?.data?.id
  if (!id) {
    return {
      ...prevState,
      success: false,
      error: 'User ID is missing. Cannot update user.',
    }
  }

  try {
    // Zod validation
    const validatedFields = await updateUserSchema.safeParseAsync({ name, email, role })
    
    // Return early if the form data is invalid
    if (!validatedFields.success) {
      const errors = treeifyError(validatedFields.error)
      return {
        ...prevState,
        success: false,
        data: { id, name, email, role },
        errors,
      };
    }

    // Update the user in the database
    await updateUser(id, {
      name,
      email,
      role: role === 'ADMIN' ? Role.ADMIN : Role.USER,
    })

    // Return the updated state with success flag
    return { success: true }
  } catch (err) {
    console.error('❌ updateUser error:', err)

    // Return error details for display in the UI
    return {
      ...prevState,
      success: false,
      data: { id, name, email, role },
      error: 'Internal server error'
    }
  }
}
