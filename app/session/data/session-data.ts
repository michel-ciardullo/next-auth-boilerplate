'server only'

import prisma from "@/app/lib/prisma";

export async function getSessionById(id: string) {
  return await prisma.session.findUnique({
    where: { id },
    include: { user: true },
  });
}

export async function getUserSessionsByUserId(userId: string) {
	return prisma.session.findMany({ where: { userId }, });
}

export async function createUserSession(data: {
  userId: string;
  expiresAt: Date;
  userAgent?: string;
  ipAddress?: string;
}) {
  return prisma.session.create({ data });
}

export async function deleteSessionById(id: string) {
  return prisma.session.delete({
    where: { id }
  });
}

export async function deleteOtherSessions(userId: string, currentSessionId: string) {
  return prisma.session.deleteMany({
    where: {
      userId,
      id: { not: currentSessionId },
    },
  })
}
