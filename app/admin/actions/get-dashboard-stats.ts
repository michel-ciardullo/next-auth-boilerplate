'use server'

import { forbidden, unauthorized } from "next/navigation"

import { verifySession } from "@/app/auth/dal/auth-dal"
import { Role } from "@/app/generated/prisma"
import prisma from "@/app/lib/prisma"

export async function getDashboardStats() {
  // User authentication and role verification
  const session = await verifySession()

  // Check if the user is authenticated
  if (!session) {
    // User is not authenticated
    unauthorized()
  }

  // Check if the user has the 'admin' role
  if (session.user.role !== Role.ADMIN) {
    // User is authenticated but does not have the right permissions
    forbidden()
  }

  // Fetch dashboard statistics concurrently
  const [userCount, orderCount, revenueSum, sessionCount] = await Promise.all([
    prisma.user.count(),    // Count total users
    0,                      // Placeholder for total orders (replace with prisma.order.count())
    0,                      // Placeholder for total revenue (replace with prisma.order.aggregate({ _sum: { total: true } }))
    prisma.session.count(), // Count total sessions
  ])

  // Return aggregated statistics for the admin dashboard
  return {
    totalUsers: userCount,
    totalOrders: orderCount,
    totalRevenue: 0, // Placeholder value for revenue
    totalSessions: sessionCount,
  }
}
