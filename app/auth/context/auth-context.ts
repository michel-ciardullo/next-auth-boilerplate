import { createContext } from "react";
import { User } from "@/app/generated/prisma";

interface AuthContextType {
  user?: User;
  status: string;
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  status: 'loading',
});
