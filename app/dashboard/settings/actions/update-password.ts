"use server";

import { z, treeifyError } from "zod";
import { forbidden, unauthorized } from "next/navigation";

import { verifySession } from "@/app/auth/dal/auth-dal";
import { Role } from "@/app/generated/prisma";

import { getUserById, updateUserPassword } from "@/app/user";
import { hashPassword, verifyPassword } from "@/app/lib/password";

// Zod schema to validate password update form input
const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type UpdatePasswordState = {
  data: {
    id: string
    currentPassword?: string
    newPassword?: string
    confirmPassword?: string
  }
  success?: boolean
  errors?: {
    properties?: {
      currentPassword?: { errors: string[] }
      newPassword?: { errors: string[] }
      confirmPassword?: { errors: string[] }
    }
  }
  message?: string
  error?: string
}

/**
 * Server action to update a user's password.
 * Performs authentication, authorization, validation, and password hashing.
 */
export default async function updatePassword(
  prevState: UpdatePasswordState,
  formData: FormData
): Promise<UpdatePasswordState> {
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

  // Extract form data
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword     = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validate input using Zod
  const validated = await schema.safeParseAsync({
    currentPassword,
    newPassword,
    confirmPassword,
  });

  if (!validated.success) {
    const errors = treeifyError(validated.error);
    return {
      ...prevState,
      success: false,
      errors,
    };
  }

  try {
    // Retrieve user from the database
    const user = await getUserById(prevState.data.id);

    if (!user) {
      // User not found in DB
      return {
        ...prevState,
        success: false,
        error: 'User not found',
      };
    }

    // Verify that the current password is correct
    const validPassword = await verifyPassword(currentPassword, user.password);
    if (!validPassword) {
      return {
        ...prevState,
        success: false,
        errors: {
          properties: {
            currentPassword: { errors: ["Incorrect current password"] },
          },
        },
      };
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update the user's password in the database
    await updateUserPassword(prevState.data.id, hashedPassword);

    // Return success response
    return {
      ...prevState,
      success: true,
      message: "Password successfully updated.",
      errors: undefined
    };
  } catch (error) {
    console.error(error);

    // Return generic server error
    return {
      ...prevState,
      success: false,
      error: 'An unexpected error occurre',
    };
  }
}
