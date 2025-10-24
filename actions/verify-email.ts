"use server";

import prisma from "@/lib/prisma";

export default async function verifyEmail(currentState: any, formData: FormData) {
  const token = (formData.get("token") as string)?.trim();

  if (!token) {
    return {
      ...currentState,
      errors: { general: "Invalid or missing token" },
    };
  }

  const user = await prisma.user.findUnique({ where: { emailVerificationToken: token } });

  if (!user) {
    return {
      ...currentState,
      errors: { general: "Invalid or expired token" },
    };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerifiedAt: new Date(),
      emailVerificationToken: null
    },
  });

  return { success: true };
}
