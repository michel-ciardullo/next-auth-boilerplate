"use server";

import { z, treeifyError } from "zod";
import prisma from "@/lib/prisma";

// Define Zod schema
const schema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.email("Invalid email address"),
  });

export default async function updateProfile(currentState: any, formData: FormData) {
  const username = (formData.get("username") as string)?.trim()
  const email = (formData.get("email") as string)?.trim()

  // Zod validation
  const validatedFields = await schema.safeParseAsync({ username, email })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    const errors = treeifyError(validatedFields.error)
    return {
      ...currentState,
      username,
      email,
      success: false,
      errors,
    };
  }

  try {
    // Retrieves the logged-in user
    const userId = parseInt(currentState.userId as string, 10)

    await prisma.user.update({
      where: { id: userId },
      data: {
        name: validatedFields.data.username,
        email: validatedFields.data.email,
      },
    })

    return {
      ...currentState,
      success: true,
      username,
      email,
      message: "Profile successfully updated",
    }
  }
  catch (error) {
    return {
      ...currentState,
      username,
      email,
      success: false,
      errors: {
        server: { errors: ["An unexpected error occurred"] },
      },
    }
  }
}
