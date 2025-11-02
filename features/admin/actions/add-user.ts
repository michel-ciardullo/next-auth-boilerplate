'use server'

import { z } from 'zod'
import { randomBytes } from 'crypto'

import { Role } from '@/app/generated/prisma'
import { createUser } from '@/features/user'
import { hashPassword } from '@/features/password'
import { sendEmail } from '@/lib/email'

// Schema Zod pour valider le formData
const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email'),
  role: z.enum(['USER', 'ADMIN']).optional(),
})

export async function createUserAction(prevState: any, formData: FormData) {
  try {
    // Extraire et valider les champs
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const role = (formData.get('role') as string) || 'USER'

    const parsed = createUserSchema.parse({ name, email, role })

    // Générer un mot de passe sécurisé
    const password = randomBytes(8).toString('hex') // 16 caractères hex
    const hashed = await hashPassword(password)

    // Créer l'utilisateur
    await createUser({
      name: parsed.name,
      email: parsed.email,
      password: hashed,
      role: parsed.role === 'ADMIN' ? Role.ADMIN : Role.USER,
      emailVerifiedAt: new Date(),
    })

    // Envoyer le mot de passe par email
    await sendEmail({
      to: parsed.email,
      subject: 'Your new account',
      html: `<p>Hello ${parsed.name},</p>
             <p>Your account has been created. Your temporary password is:</p>
             <p><strong>${password}</strong></p>
             <p>Please log in and change it immediately.</p>`,
    })

    return { ...prevState, success: true }
  } catch (err: any) {
    console.error('❌ createUserAction error:', err)
    return { error: 'Failed to create user' }
  }
}
