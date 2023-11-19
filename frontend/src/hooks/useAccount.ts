import axios from "axios";
import useAuth from "./useAuth";
import { Account } from "../interfaces/Account";
import httpStatus from "http-status";

export function useAccount() {
  const { user } = useAuth();

  const Axios = axios.create({
    headers: { Authorization: `Bearer ${user?.token}` },
    validateStatus: () => true,
  });

  const getAll = async () => {
    const response = await Axios.get(
      `${import.meta.env.VITE_API_URL}/account`
    );
    const { message, data } = response.data;
    if (response.status !== httpStatus.OK) throw Error(message ?? "");

    return data;
  };

  const create = async (account: Account) => {
    const response = await Axios.post(
      `${import.meta.env.VITE_API_URL}/account`,
      account
    );

    const { message, data } = response.data;
    if (response.status !== httpStatus.OK) throw Error(message ?? "");

    return data;
  };

  const update = async (id: string, account: Account) => {
    const response = await Axios.put(
      `${import.meta.env.VITE_API_URL}/account/${id}`,
      account
    );

    const { message, data } = response.data;
    if (response.status !== httpStatus.OK) throw Error(message ?? "");

    return data;
  };

  const remove = async (id: string) => {
    const response = await Axios.delete(`${import.meta.env.VITE_API_URL}/account/${id}`)

    const { message, data } = response.data;
    if (response.status !== httpStatus.OK) throw Error(message ?? "Some Error Occurred");

    return data;
  };

  return {
    getAll,
    create,
    update,
    remove,
  };
}
