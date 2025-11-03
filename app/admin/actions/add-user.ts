'use server'

import { z } from 'zod'
import { randomBytes } from 'crypto'
import { unauthorized, forbidden } from 'next/navigation'

import { Role } from '@/app/generated/prisma'
import { createUser } from '@/app/user'
import { verifySession } from '@/app/auth/dal/auth-dal'
import { hashPassword } from '@/app/lib/password'
import { sendEmail } from '@/app/lib/email'

// Zod schema for validating the submitted form data
const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email'),
  role: z.enum(['USER', 'ADMIN']).optional(),
})

export async function createUserAction(prevState: any, formData: FormData) {
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
    // Extract and validate fields from the form
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const role = (formData.get('role') as string) || Role.USER

    const parsed = createUserSchema.parse({ name, email, role })

    // Generate a secure random temporary password
    const password = randomBytes(8).toString('hex')
    const hashed = await hashPassword(password)

    // Create the new user in the database
    await createUser({
      name: parsed.name,
      email: parsed.email,
      password: hashed,
      role: parsed.role === 'ADMIN' ? Role.ADMIN : Role.USER,
      emailVerifiedAt: new Date(),
    })

    // Send an email containing the temporary password
    await sendEmail({
      to: parsed.email,
      subject: 'Your new account',
      html: `<p>Hello ${parsed.name},</p>
             <p>Your account has been created successfully.</p>
             <p>Your temporary password is:</p>
             <p><strong>${password}</strong></p>
             <p>Please log in and change your password immediately.</p>`,
    })

    return { ...prevState, success: true }
  } catch (err: any) {
    console.error('❌ createUserAction error:', err)

    // Handle validation or runtime errors
    if (err instanceof Error) {
      return { success: false, error: err.message }
    }

    // Fallback for unexpected issues
    return { success: false, error: 'Internal server error' }
  }
}
