'use server'

import { forbidden, unauthorized } from "next/navigation";
import { revalidatePath } from "next/cache";

import { verifySession } from "@/features/auth/dal/auth-dal";
import { Role } from "@/app/generated/prisma";
import { deleteUser } from "@/features/user";

export async function deleteUserById(userId: string) {
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

  // Delete the specified user from the database
  await deleteUser(userId)

  // Revalidate the users page to ensure the UI reflects the updated data
  revalidatePath('/admin/users')
}
