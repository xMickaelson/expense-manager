import { ReactNode, useEffect } from "react";
import AuthContext from "./AuthContext";
import useAuthProvider from "../../hooks/useAuthProvider";
import useLoading from "../../hooks/useLoading";

interface AuthProviderProps {
  children: ReactNode;
}
function AuthProvider(props: AuthProviderProps) {
  const { children } = props;
  const { loading, showProgress } = useLoading();
  const auth = useAuthProvider();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const promise = auth.verify(token);

    showProgress(promise);
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
