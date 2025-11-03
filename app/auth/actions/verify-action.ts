"use server";

import { findUserByEmailVerificationToken, verifyUserEmail } from "@/app/user";

type VerifyActionState = {
  data?: {
    token?: string
  }
  success?: boolean
  error?: string
}

export default async function verifyAction(
  currentState: VerifyActionState,
  formData: FormData
): Promise<VerifyActionState> {
  const token = (formData.get("token") as string)?.trim();

  if (!token) {
    return {
      ...currentState,
      error: "Invalid or missing token",
    };
  }

  const user = await findUserByEmailVerificationToken(token);

  if (!user) {
    return {
      ...currentState,
      error: "Invalid or expired token",
    };
  }

  await verifyUserEmail(user.id);

  return { success: true };
}
