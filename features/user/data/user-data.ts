'server only'

import { User } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

export async function createUser(data: {
  name: string,
  email: string,
  password: string,
  emailVerificationToken: string,
}) {
  return prisma.user.create({ data });
}

/**
 * Updates a user's profile.
 */
export async function updateUserProfile(userId: string, data: { name?: string; email?: string; image?: string }) {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: { id: true, name: true, email: true, image: true },
  });
}

/**
 * Deletes a user (⚠️ with caution)
 */
export async function deleteUser(userId: string) {
  return prisma.$transaction([
    prisma.passwordReset.deleteMany({ where: { userId: userId } }),
    prisma.session.deleteMany({ where: { userId } }),
    prisma.user.delete({ where: { id: userId } }),
  ])
}

/**
 * Search for a user by email.
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
  });
}

export async function updateUserPassword(userId: string, hashPassword: string) {
  return await prisma.user.update({
    where: { id: userId },
    data: { password: hashPassword },
  });
}

/**
 * Find a user by their email verification token.
 * 
 * @param token - The email verification token sent to the user.
 * @returns The user if found, otherwise null.
 */
export async function findUserByEmailVerificationToken(token: string) {
  return prisma.user.findUnique({
    where: { emailVerificationToken: token },
  });
}

/**
 * Mark a user's email as verified and clear the verification token.
 * 
 * @param userId - The user's ID.
 * @returns The updated user object (only selected fields).
 */
export async function verifyUserEmail(userId: string) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      emailVerifiedAt: new Date(),
      emailVerificationToken: null,
    },
    select: {
      id: true,
      email: true,
      emailVerifiedAt: true,
    },
  });
}
