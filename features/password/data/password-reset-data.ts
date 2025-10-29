'server only'

import prisma from "@/lib/prisma";

/**
 * Deletes all reset tokens for a user.
 */
export async function deletePasswordResetTokens(userId: string) {
  return prisma.passwordReset.deleteMany({
    where: { userId },
  });
}

/**
 * Creates a new reset token for a user.
 */
export async function createPasswordResetToken(userId: string, token: string, expiresAt: Date) {
  return prisma.passwordReset.create({
    data: { userId, token, expiresAt },
  });
}

export async function findPasswordResetByToken(token: string) {
  return prisma.passwordReset.findUnique({
    where: { token },
    include: { user: true },
  });
}

export async function deletePasswordResetById(passwordResetId: number) {
  return prisma.passwordReset.delete({
    where: { id: passwordResetId },
  });
}
