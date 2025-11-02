"use server";

import { redirect } from "next/navigation";

import { z, treeifyError } from "zod";

import { findUserByEmail } from "@/features/user";
import { verifyPassword } from "@/features/password";
import { createSession } from "@/features/session";

// Define Zod schema
const schema = z
  .object({
    email: z.email("Invalid email address"),
    password: z.string().trim(),
    remember: z.enum(["on"]).optional().nullable()
  });

export default async function loginAction(currentState: any, formData: FormData) {
  const email    = (formData.get("email") as string)?.trim() || "";
  const password = formData.get("password") as string;
  const remember = formData.get("remember") as string | null;

  // Zod validation
  const validatedFields = await schema.safeParseAsync({ email, password, remember });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    const errors = treeifyError(validatedFields.error)
    return { ...currentState, email, errors };
  }

  const user = await findUserByEmail(email);

  const valid = user
    ? await verifyPassword(password, user.password)
    : false;

  if (!user || !valid) {
    return {
      email,
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
