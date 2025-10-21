"use server";

import { z, treeifyError } from "zod";
import { randomBytes } from "crypto";
import prisma from "@/lib/prisma";

let user: { id: number } | null = null;

// Define Zod schema
const schema = z
  .object({
    email: z.email("Invalid email address"),
  })
  // Custom async validator for email founded in db
  .superRefine(async (data, ctx) => {
    user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      ctx.addIssue({
        path: ["email"],
        code: 'custom',
        message: "No account found with this email",
      });
    }
  });

export default async function forgotPassword(currentState: any, formData: FormData) {
  const email = (formData.get("email") as string)?.trim() || "";

  // Zod validation
  const validatedFields = await schema.safeParseAsync({ email });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    const errors = treeifyError(validatedFields.error)
    return {
      ...currentState,
      success: false,
      email,
      errors,
    };
  }

  // Generate reset token
  const token = randomBytes(32).toString("hex");

  // Add 1 hour to current time
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 60 min * 60 sec * 1000 ms

  const passwordResets = await prisma.passwordReset.findMany();

  await prisma.passwordReset.create({
    data: {
      userId: user!.id,
      token,
      expiresAt: expires,
    },
  });

  // TODO: send email with reset link
  console.log(`Reset link: https://your-app.com/auth/reset-password?token=${token}`);

  return {
    success: true,
    message: "If an account exists with this email, a reset link has been sent.",
  };
}
