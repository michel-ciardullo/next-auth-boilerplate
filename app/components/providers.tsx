'use client'

import AuthProvider from "../auth/components/auth-provider"

interface ProvidersProps {
  user: any
  children: React.ReactNode
}

export function Providers({ user, children }: ProvidersProps) {
  return <AuthProvider user={user}>{children}</AuthProvider>
}
