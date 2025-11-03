"use server"

import { treeifyError, z } from "zod"
import { forbidden, unauthorized } from "next/navigation"

import { verifySession } from "@/app/auth/dal/auth-dal"
import { Role } from "@/app/generated/prisma"
import { deleteUser } from "@/app/user"

// Zod schema to validate that the user typed "DELETE" to confirm account deletion
const schema = z.object({
  confirmDelete: z
    .string()
    .trim()
    .refine((val) => val === "DELETE", {
      message: 'You must type "DELETE" to confirm account deletion',
    }),
})

type DeleteAccountState = {
  data: {
    userId: string
    confirmDelete?: string
  }
  success?: boolean
  errors?: {
    properties?: {
      userId?: { errors: string[] }
      confirmDelete?: { errors: string[] }
    }
  }
  message?: string
  error?: string
}

/**
 * Server action to delete a user's account.
 * Performs authentication, authorization, confirmation validation, and account deletion.
 */
export default async function deleteAccount(
  prevState: DeleteAccountState,
  formData: FormData
): Promise<DeleteAccountState> {
  // User authentication and role verification
  const session = await verifySession()

  // Check if the user is authenticated
  if (!session) {
    // User is not authenticated
    unauthorized()
  }

  // Check if the user has either 'USER' or 'ADMIN' role
  if (session.user.role !== Role.USER && session.user.role !== Role.ADMIN) {
    // User is authenticated but does not have permission to delete this account (403)
    forbidden()
  }

  // Optional: ensure the user's email is verified before allowing deletion
  if (session.user.emailVerifiedAt === null) {
    // User is authenticated but their email is not verified — deny deletion
    forbidden()
  }

  try {
    // Extract form data
    const userId = (formData.get("userId") as string)?.trim()
    const confirmDelete = (formData.get("confirmDelete") as string)?.trim()

    // Validate the confirmation input
    const validated = schema.safeParse({ confirmDelete })
    if (!validated.success) {
      const errors = treeifyError(validated.error);
      return {
        ...prevState,
        success: false,
        errors,
      }
    }

    // Perform the actual account deletion
    await deleteUser(userId)

    // Return success response
    return {
      ...prevState,
      success: true,
      message: "Your account has been deleted successfully.",
    }
  } catch (error) {
    console.error("❌ deleteAccount error:", error)

    // Return a generic error response
    return {
      ...prevState,
      success: false,
      error: "An unexpected error occurred while deleting your account.",
    }
  }
}
