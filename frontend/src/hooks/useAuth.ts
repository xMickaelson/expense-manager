import { useContext } from "react";
import AuthContext from "../context/authentication/AuthContext";

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) throw Error("AuthContext must not be null");

  return authContext;
};

export default useAuth;
