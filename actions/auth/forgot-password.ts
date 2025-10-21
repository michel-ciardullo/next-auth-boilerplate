"use server";

import { z, treeifyError } from "zod";
import prisma from "@/lib/prisma";

// Define Zod schema
const registerSchema = z
  .object({
    email: z.email("Invalid email address"),
  })
  // Custom async validator for email founded in db
  .superRefine(async (data, ctx) => {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (!existingUser) {
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
  const validatedFields = await registerSchema.safeParseAsync({ email });

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

  console.log(`Send password reset email to ${email}`);

  return {
    success: true,
    message: "If an account exists with this email, a reset link has been sent.",
  };
}
