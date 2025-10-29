'server only'

import prisma from "@/lib/prisma";

export async function getSessionById(sessionId: string) {
  return await prisma.session.findUnique({
    where: { id: sessionId },
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

export async function deleteSessionById(sessionId: string) {
  return prisma.session.delete({
    where: { id: sessionId }
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
