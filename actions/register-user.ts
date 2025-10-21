"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z, treeifyError } from "zod";
import prisma from "@/lib/prisma";

// Define Zod schema
const schema = z
  .object({
    name: z.string().min(3, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  // Confirm password match
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  // Custom async validator for email uniqueness
  .superRefine(async (data, ctx) => {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      ctx.addIssue({
        path: ["email"],
        code: 'custom',
        message: "Email is already registered",
      });
    }
  });

export default async function registerUser(currentState: any, formData: FormData) {
  const name            = (formData.get("name") as string)?.trim() || "";
  const email           = (formData.get("email") as string)?.trim() || "";
  const password        = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Zod validation
  const validatedFields = await schema.safeParseAsync({ name, email, password, confirmPassword });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    const errors = treeifyError(validatedFields.error)
    return {
      ...currentState,
      name,
      email,
      errors,
    };
  }

  // --- Create user ---
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  // Redirect to login page
  redirect("/auth/login");
}
