"use server";

import bcrypt from "bcryptjs";
import { z, treeifyError } from "zod";
import prisma from "@/lib/prisma";

// Define Zod schema
const schema = z
  .object({
    token: z.string().min(1, "Missing reset token"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  // Confirm password match
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default async function resetPassword(currentState: any, formData: FormData) {
  const token = (formData.get("token") as string)?.trim();
  const password        = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Zod validation
  const validatedFields = await schema.safeParseAsync({ token, password, confirmPassword });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    const errors = treeifyError(validatedFields.error)
    return {
      ...currentState,
      success: false,
      errors,
    };
  }

  // Find the token in the database
  const resetRecord = await prisma.passwordReset.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!resetRecord || resetRecord.expiresAt < new Date()) {
    return {
      success: false,
      errors: {
        properties: {
          password: {
            errors: ["Invalid or expired token"],
          },
        },
      },
    };
  }

  // Hash and update the password
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: resetRecord.userId },
    data: { password: hashedPassword },
  });

  // Delete the token after successful reset
  await prisma.passwordReset.delete({
    where: { id: resetRecord.id },
  });

  return {
    success: true,
    message: "Password successfully reset.",
  };
}
