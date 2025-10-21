"use server";

import { randomBytes } from "crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z, treeifyError } from "zod";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

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

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate verification token
  const token = randomBytes(32).toString("hex");

  await prisma.user.create({
    data: { name, email, password: hashedPassword, emailVerificationToken: token },
  });

  const origin = (await headers()).get('origin')

  // send verification email
  console.log(`Verify your email: ${origin}/auth/verify?token=${token}`);

  // Envoyer mail de vérification
  const verifyUrl = `${origin}/auth/verify?token=${token}`;
  await sendEmail({
    to: email,
    subject: "Verify your email",
    html: `<p>Hello ${name},</p>
           <p>Click the link below to verify your email:</p>
           <a href="${verifyUrl}">${verifyUrl}</a>`,
  });

  // Redirect to login page
  redirect("/auth/login");
}
