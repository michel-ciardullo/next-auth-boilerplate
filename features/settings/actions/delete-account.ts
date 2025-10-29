"use server"

import { z } from "zod"
import { deleteUser } from "@/features/user"

const schema = z.object({
  confirmDelete: z
    .string()
    .trim()
    .refine((val) => val === "DELETE", {
      message: 'You must type "DELETE" to confirm account deletion',
    }),
})

export default async function deleteAccount(currentState: any, formData: FormData) {
  try {
    const userId = (formData.get("userId") as string)?.trim()
    const confirmDelete = (formData.get("confirmDelete") as string)?.trim()

    const validated = schema.safeParse({ confirmDelete })
    if (!validated.success) {
      return {
        ...currentState,
        success: false,
        errors: z.treeifyError(validated.error),
      }
    }

    await deleteUser(userId)

    return {
      ...currentState,
      success: true,
      message: "Your account has been deleted successfully.",
    }
  } catch (error) {
    console.error("❌ deleteAccount error:", error)
    return {
      ...currentState,
      success: false,
      error: "An unexpected error occurred while deleting your account.",
    }
  }
}
