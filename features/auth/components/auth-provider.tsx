import { ReactNode, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/auth-context";

interface AuthProviderProps {
  user?: any
  children: ReactNode
}

export default function AuthProvider({ user: initialUser, children }: AuthProviderProps) {
  const [user, setUser] = useState<any>(initialUser);
  const [loading, setLoading] = useState<boolean>(initialUser === undefined);

  useEffect(() => {
    if (user !== initialUser)
      setUser(initialUser)
  }), [initialUser]

  const value = useMemo(() => ({
    user,
    status: loading
      ? "loading"
      : user
        ? "authenticated"
        : "unauthenticated",
    async update(data: any) {
      
    }
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
