import axios from "axios";
import useAuth from "./useAuth";
import { Category } from "../interfaces/Category";
import httpStatus from "http-status";

export function useCategory() {
  const { user } = useAuth();

  const Axios = axios.create({
    headers: { Authorization: `Bearer ${user?.token}` },
    validateStatus: () => true,
  });

  const getAll = async () => {
    const response = await Axios.get(
      `${import.meta.env.VITE_API_URL}/category`
    );
    const { message, data } = response.data;
    if (response.status !== httpStatus.OK) throw Error(message ?? "");

    return data;
  };

  const create = async (category: Category) => {
    const response = await Axios.post(
      `${import.meta.env.VITE_API_URL}/category`,
      category
    );

    const { message, data } = response.data;
    if (response.status !== httpStatus.OK) throw Error(message ?? "");

    return data;
  };

  const update = async (id: string, category: Category) => {
    const response = await Axios.put(
      `${import.meta.env.VITE_API_URL}/category/${id}`,
      category
    );

    const { message, data } = response.data;
    if (response.status !== httpStatus.OK) throw Error(message ?? "");

    return data;
  };

  const remove = async (id: string) => {
    const response = await Axios.delete(`${import.meta.env.VITE_API_URL}/category/${id}`)

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
