'use server'

import { deleteUser } from "@/features/user";
import { revalidatePath } from "next/cache";

export async function deleteUserById(userId: string) {
  await deleteUser(userId)
  revalidatePath('/admin/users')
}
