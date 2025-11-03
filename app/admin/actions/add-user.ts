'use server'

import { treeifyError, z } from 'zod'
import { randomBytes } from 'crypto'
import { unauthorized, forbidden } from 'next/navigation'

import { Role } from '@/app/generated/prisma'
import { createUser, findUserByEmail } from '@/app/user'
import { verifySession } from '@/app/auth/dal/auth-dal'
import { hashPassword } from '@/app/lib/password'
import { sendEmail } from '@/app/lib/email'

// Zod schema for validating the submitted form data
const createUserSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email'),
    role: z.enum(['USER', 'ADMIN']).optional(),
  })
  // Custom async validator for email uniqueness
  .superRefine(async (data, ctx) => {
    const existingUser = await findUserByEmail(data.email);
    if (existingUser) {
      ctx.addIssue({
        path: ["email"],
        code: 'custom',
        message: "Email is already registered",
      });
    }
  })

type CreateUserState = {
  data?: {
    name?: string
    email?: string
    role?: string
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
} | null

export async function createUserAction(
  prevState: CreateUserState,
  formData: FormData
): Promise<CreateUserState> {
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

  try {
    // Zod validation
    const validatedFields = await createUserSchema.safeParseAsync({ name, email, role })
    
    // Return early if the form data is invalid
    if (!validatedFields.success) {
      const errors = treeifyError(validatedFields.error)
      return {
        ...prevState,
        success: false,
        data: { name, email, role },
        errors,
      };
    }

    // Generate a secure random temporary password
    const password = randomBytes(8).toString('hex')
    const hashed = await hashPassword(password)

    // Create the new user in the database
    await createUser({
      name,
      email,
      password: hashed,
      role: role === 'ADMIN' ? Role.ADMIN : Role.USER,
      emailVerifiedAt: new Date(),
    })

    // Send an email containing the temporary password
    await sendEmail({
      to: email,
      subject: 'Your new account',
      html: `<p>Hello ${name},</p>
             <p>Your account has been created successfully.</p>
             <p>Your temporary password is:</p>
             <p><strong>${password}</strong></p>
             <p>Please log in and change your password immediately.</p>`,
    })

    return { success: true }
  } catch (err) {
    console.error('❌ createUserAction error:', err)

    // Fallback for unexpected issues
    return {
      ...prevState,
      success: false,
      data: { name, email, role },
      error: 'Internal server error'
    }
  }
}
