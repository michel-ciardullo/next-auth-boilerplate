"use server";

import { headers } from "next/headers";

import { randomBytes } from "crypto";
import { z, treeifyError } from "zod";

import { User } from "@/app/generated/prisma";
import { findUserByEmail } from "@/app/user";
import { createPasswordResetToken, deletePasswordResetById } from "@/app/password/data/password-reset-data";
import { sendEmail } from "@/app/lib/email";

let user: User | null = null;

// Define Zod schema
const schema = z
  .object({
    email: z.email("Invalid email address"),
  })
  // Custom async validator for email founded in db
  .superRefine(async (data, ctx) => {
    user = await findUserByEmail(data.email);
    if (!user) {
      ctx.addIssue({
        path: ["email"],
        code: 'custom',
        message: "No account found with this email",
      });
    }
  });

export default async function forgetAction(currentState: any, formData: FormData) {
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

  await deletePasswordResetById(user!.id)
  await createPasswordResetToken(user!.id, token, expires);

  const origin = (await headers()).get('origin')

  const resetUrl = `${origin}/auth/reset?token=${token}`;
  await sendEmail({
    to: email,
    subject: "Reset your password",
    html: `<p>Hello,</p>
           <p>Click the link below to reset your password:</p>
           <a href="${resetUrl}">${resetUrl}</a>`,
  });

  return {
    success: true,
    message: "If an account exists with this email, a reset link has been sent.",
  };
}
