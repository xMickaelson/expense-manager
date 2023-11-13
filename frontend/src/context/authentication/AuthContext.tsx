import { createContext } from "react";
import { User, UserDetails } from "../../interfaces/User";

interface AuthContext {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (details: UserDetails) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContext | null>(null);

export default AuthContext;
