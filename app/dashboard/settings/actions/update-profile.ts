"use server";

import path from "path";
import fs from "fs/promises";
import { forbidden, unauthorized } from "next/navigation";
import { z, treeifyError } from "zod";

import { verifySession } from "@/app/auth/dal/auth-dal";
import { Role } from "@/app/generated/prisma";
import { updateUserProfile } from "@/app/user";

// Mapping of MIME types to reliable file extensions
const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg":  "jpg",
  "image/pjpeg": "jpg",
  "image/png":   "png",
  "image/webp":  "webp",
  "image/gif":   "gif",
};

// Maximum allowed file size: 5 MB
const MAX_BYTES = 5 * 1024 * 1024;

// Zod schema to validate username and email
const schema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.email("Invalid email address"),
  });

/**
 * Server action to update a user's profile including username, email, and profile image.
 * Performs authentication, authorization, validation, secure file handling, and database update.
 */
export default async function updateProfile(currentState: any, formData: FormData) {
  // User authentication and role verification
  const session = await verifySession()

  // Check if the user is authenticated
  if (!session) {
    // User is not authenticated
    unauthorized()
  }

  // Check if the user has either 'USER' or 'ADMIN' role
  if (session.user.role !== Role.USER && session.user.role !== Role.ADMIN) {
    // User is authenticated but does not have permission to delete this account (403)
    forbidden()
  }

  // Optional: ensure the user's email is verified before allowing deletion
  if (session.user.emailVerifiedAt === null) {
    // User is authenticated but their email is not verified — deny deletion
    forbidden()
  }

  // Extract form data
  const username = (formData.get("username") as string)?.trim()
  const email = (formData.get("email") as string)?.trim()
  const file = formData.get("image") as File | null

  // Validate username and email using Zod
  const validatedFields = await schema.safeParseAsync({ username, email })

  // Return early if validation fails
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
      // Check maximum file size
      if (file.size > MAX_BYTES) {
        return {
          ...currentState,
          username,
          email,
          success: false,
          errors: { server: { errors: ["Image too large (max 5MB)"] } },
        };
      }

      // Determine reliable MIME type and corresponding extension
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

      // Read the file securely into a buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate a safe filename using the user ID and MIME-derived extension
      const fileName = `${currentState.userId}.${ext}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      // Ensure upload directory exists and write the file
      await fs.mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);

      imageUrl = `/uploads/${fileName}`;
    }

    // Update user profile in the database
    await updateUserProfile(currentState.userId, {
      name: validatedFields.data.username,
      email: validatedFields.data.email,
      image: imageUrl,
    })

    // Return success response
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

    // Return generic server error if anything unexpected happens
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
