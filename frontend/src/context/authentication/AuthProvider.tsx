import { ReactNode, useEffect } from "react";
import AuthContext from "./AuthContext";
import useAuthProvider from "../../hooks/useAuthProvider";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}
function AuthProvider(props: AuthProviderProps) {
  const { children } = props;
  const navigate = useNavigate()
  const auth = useAuthProvider();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    auth.setUserDetails({ token, name: "" });
    navigate('/dashboard')
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
