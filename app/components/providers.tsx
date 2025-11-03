'use client'

import AuthProvider from "../auth/components/auth-provider"
import { User } from "../generated/prisma"

interface ProvidersProps {
  user?: User
  children: React.ReactNode
}

export function Providers({ user, children }: ProvidersProps) {
  return <AuthProvider user={user}>{children}</AuthProvider>
}
