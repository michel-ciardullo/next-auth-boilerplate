"use server";

import bcrypt from "bcryptjs";
import { z, treeifyError } from "zod";
import prisma from "@/lib/prisma";

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

export default async function updatePassword(currentState: any, formData: FormData) {
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // ✅ Validate input
  const validated = await schema.safeParseAsync({
    currentPassword,
    newPassword,
    confirmPassword,
  });

  if (!validated.success) {
    const errors = treeifyError(validated.error);
    return {
      ...currentState,
      success: false,
      errors,
    };
  }

  try {
    // ✅ Get user from DB
    const user = await prisma.user.findUnique({
      where: { id: currentState.userId },
      select: { password: true },
    });

    if (!user) {
      return {
        ...currentState,
        success: false,
        errors: {
          server: { errors: ["User not found"] },
        },
      };
    }

    // ❌ Check if current password is correct
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return {
        ...currentState,
        success: false,
        errors: {
          properties: {
            currentPassword: { errors: ["Incorrect current password"] },
          },
        },
      };
    }

    // 🔐 Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 💾 Update user password
    await prisma.user.update({
      where: { id: currentState.userId },
      data: { password: hashedPassword },
    });

    return {
      ...currentState,
      success: true,
      message: "Password successfully updated.",
      errors: null
    };
  } catch (error) {
    console.error(error);
    return {
      ...currentState,
      success: false,
      errors: {
        server: { errors: ["An unexpected error occurred"] },
      },
    };
  }
}
