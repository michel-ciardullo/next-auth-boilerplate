import { ReactNode, useMemo } from "react";

import { User } from "@/app/generated/prisma";
import { AuthContext } from "../context/auth-context";

interface AuthProviderProps {
  user?: User
  children: ReactNode
}

export default function AuthProvider({ user, children }: AuthProviderProps) {
  const cachedValue = useMemo(() => ({
    user,
    status: user ? "authenticated" : "unauthenticated",
  }), [user]);

  return (
    <AuthContext.Provider value={cachedValue}>
      {children}
    </AuthContext.Provider>
  );
}
