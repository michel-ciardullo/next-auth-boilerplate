"use server";

import { randomBytes } from "crypto";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { z, treeifyError } from "zod";

import { sendEmail } from "@/lib/email";
import { hashPassword } from "@/features/password";
import { createUser, findUserByEmail } from "@/features/user";

export type FormState =
  | {
      name?: string
      email?: string
      errors?: {
        properties?: {
          name?: { errors: string[] }
          email?: { errors: string[] }
          password?: { errors: string[] }
          confirmPassword?: { errors: string[] }
          agree?: { errors: string[] }
        },
        server?: { errors: string[] }
      }
    }
  | null

// Define Zod schema
const schema = z
  .object({
    name: z.string().min(3, "Name is required"),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, { error: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
      .regex(/[0-9]/, { error: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        error: 'Contain at least one special character.',
      })
      .trim(),
    confirmPassword: z.string(),
    agree: z.literal("on", { error: "You must accept the Terms and Privacy Policy" })
  })
  // Confirm password match
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  // Custom async validator for email uniqueness
  .superRefine(async (data, ctx) => {
    const existingUser = await findUserByEmail(data.email);
    if (existingUser) {
      ctx.addIssue({
        path: ["email"],
        code: 'custom',
        message: "Email is already registered",
      });
    }
  });

export default async function registerUser(currentState: FormState, formData: FormData): Promise<FormState> {
  const name            = (formData.get("name") as string)?.trim() || "";
  const email           = (formData.get("email") as string)?.trim() || "";
  const password        = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const agree           = formData.get("agree") as string | null;

  // Zod validation
  const validatedFields = await schema.safeParseAsync({
    name,
    email,
    password,
    confirmPassword,
    agree,
  });

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
  const hashedPassword = await hashPassword(password);

  // Generate verification token
  const token = randomBytes(32).toString("hex");

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
    emailVerificationToken: token,
    // acceptedTermsAt: new Date(),
  });

  if (!user) {
    return {
      errors: {
        server: { errors: ["An unexpected error occurred"] },
      },
    }
  }

  const origin = (await headers()).get('origin')

  // send verification email
  console.log(`Verify your email: ${origin}/auth/verify?token=${token}`);

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
