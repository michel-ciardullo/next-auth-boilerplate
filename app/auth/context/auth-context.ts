import { createContext } from "react";

interface AuthContextType {
  user: any | null;
  status: string;
  update: (data?: any) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  status: 'loading',
  update: async (data?: any) => {

  }
});
