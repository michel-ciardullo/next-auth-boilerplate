"use server";

import { redirect } from "next/navigation";

import { z, treeifyError } from "zod";

import { findUserByEmail } from "@/app/user";
import { verifyPassword } from "@/app/lib/password";
import { createSession } from "@/app/session/lib/session";

// Define Zod schema
const schema = z
  .object({
    email: z.email("Invalid email address"),
    password: z.string().trim(),
    remember: z.enum(["on"]).optional().nullable()
  });

type LoginActionState = {
  data: {
    email: string
  },
  success?: boolean
  errors?: {
    properties?: {
      email?: { errors: string[] }
      password?: { errors: string[] }
      remember?: { errors: string[] }
    }
  }
  message?: string
  error?: string
} | null

export default async function loginAction(
  currentState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const email    = (formData.get("email") as string)?.trim() || "";
  const password = formData.get("password") as string;
  const remember = formData.get("remember") as string | null;

  // Zod validation
  const validatedFields = await schema.safeParseAsync({ email, password, remember });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    const errors = treeifyError(validatedFields.error)
    return {
      ...currentState,
      data: { email },
      errors
    };
  }

  const user = await findUserByEmail(email);

  const valid = user
    ? await verifyPassword(password, user.password)
    : false;

  if (!user || !valid) {
    return {
      data: { email },
      errors: {
        properties: {
          password: { errors: ["Invalid email or password"] },
        },
      },
    }
  }

  // create jwt with session database.
  await createSession(user.id, user.role, remember === 'on')

  // Redirect to profile page
  redirect("/dashboard");
}
