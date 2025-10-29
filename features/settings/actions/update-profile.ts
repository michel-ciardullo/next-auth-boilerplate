"use server";

import path from "path";
import fs from "fs/promises";

import { z, treeifyError } from "zod";
import { updateUserProfile } from "@/features/user";

// Mapping MIME -> reliable extension
const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/pjpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

// Define Zod schema
const schema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.email("Invalid email address"),
  });

export default async function updateProfile(currentState: any, formData: FormData) {
  const username = (formData.get("username") as string)?.trim()
  const email = (formData.get("email") as string)?.trim()
  const file = formData.get("image") as File | null

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

  let imageUrl = currentState.image

  try {
    if (file && file.size > 0) {
      // Max size
      if (file.size > MAX_BYTES) {
        return {
          ...currentState,
          username,
          email,
          success: false,
          errors: { server: { errors: ["Image too large (max 5MB)"] } },
        };
      }

      // Reliable MIME type (do not rely solely on the file name)
      const mime = file.type;
      const ext = MIME_TO_EXT[mime];
      if (!ext) {
        return {
          ...currentState,
          username,
          email,
          success: false,
          errors: { server: { errors: ["Unsupported image type"] } },
        };
      }

      // Secure reading and writing
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generates a safe file name with an extension derived from the MIME type.
      const fileName = `${currentState.userId}.${ext}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      await fs.mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);

      imageUrl = `/uploads/${fileName}`;
    }

    await updateUserProfile(currentState.userId, {
      name: validatedFields.data.username,
      email: validatedFields.data.email,
      image: imageUrl,
    })

    return {
      ...currentState,
      success: true,
      username,
      email,
      message: "Profile successfully updated",
      errors: null
    }
  }
  catch (error) {
    console.error(error)

    return {
      ...currentState,
      username,
      email,
      image: imageUrl,
      success: false,
      errors: {
        server: { errors: ["An unexpected error occurred"] },
      },
    }
  }
}
