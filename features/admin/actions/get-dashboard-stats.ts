'use server'

import prisma from "@/lib/prisma"

export async function getDashboardStats() {
  const [userCount, orderCount, revenueSum, sessionCount] = await Promise.all([
    prisma.user.count(),
    0, // prisma.order.count(),
    0, // prisma.order.aggregate({ _sum: { total: true } }),
    prisma.session.count(),
  ])

  return {
    totalUsers: userCount,
    totalOrders: orderCount,
    totalRevenue: 0, // revenueSum._sum.total ?? 0,
    totalSessions: sessionCount,
  }
}
