'use client'

import { AuthProvider } from "@/features/auth";

interface ProvidersProps {
  user: any
  children: React.ReactNode
}

export function Providers({ user, children }: ProvidersProps) {
  return <AuthProvider user={user}>{children}</AuthProvider>
}
