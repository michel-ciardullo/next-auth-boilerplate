// Initializes and exports a singleton Prisma client instance,
// optimized for use with Prisma Accelerate in both development and production.
//
// This pattern prevents multiple Prisma clients from being instantiated
// during development when Next.js performs hot reloading.

import { PrismaClient } from '@/app/generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

// Extend the global object to store a single Prisma instance
// (avoiding multiple connections during development).
const globalForPrisma = global as unknown as { 
  prisma: PrismaClient
}

// Reuse an existing Prisma instance if available,
// otherwise create a new one with the Accelerate extension enabled.
const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate())

// In development, attach the Prisma instance to the global object.
// This prevents reinitialization during Next.js hot module reloading.
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Export the Prisma client as a singleton for use throughout the app.
export default prisma
