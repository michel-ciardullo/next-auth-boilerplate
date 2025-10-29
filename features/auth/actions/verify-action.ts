"use server";

import { findUserByEmailVerificationToken, verifyUserEmail } from "@/features/user";

export default async function verifyEmail(currentState: any, formData: FormData) {
  const token = (formData.get("token") as string)?.trim();

  if (!token) {
    return {
      ...currentState,
      errors: { general: "Invalid or missing token" },
    };
  }

  const user = await findUserByEmailVerificationToken(token);

  if (!user) {
    return {
      ...currentState,
      errors: { general: "Invalid or expired token" },
    };
  }

  await verifyUserEmail(user.id);

  return { success: true };
}
