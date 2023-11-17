import { useState } from "react";
import { User, UserDetails } from "../interfaces/User";
import axios from "axios";
import httpStatus from "http-status";

function useAuthProvider() {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/login`,
      {
        auth: { username: email, password: password },
        validateStatus: () => true,
      }
    );

    const { message, data } = response.data;

    if (response.status !== httpStatus.OK) throw Error(message);

    localStorage.setItem("token", data.token);

    setUser({ ...data });
  };

  const register = async (details: UserDetails) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/register`,
      {
        ...details,
      },
      {
        validateStatus: () => true,
      }
    );

    const { message } = response.data;

    if (response.status !== httpStatus.OK) throw Error(message);
  };

  const verify = async (token: string) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/verify`,
      {
        headers: { Authorization: `Bearer ${token}` },
        validateStatus: () => true,
      }
    );

    const { message, data } = response.data;

    if (response.status !== httpStatus.OK) throw Error(message);

    setUser({ token: token, name: data.name });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const setUserDetails = (details: User) => {
    setUser({ ...details });
  };

  return {
    user,
    login,
    register,
    logout,
    setUserDetails,
    verify,
  };
}

export default useAuthProvider;
