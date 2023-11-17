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

  const create = (category: Category) => {
    return Axios.post(
      `${import.meta.env.VITE_API_URL}/category`,
      category
    ).then((res) => res.data);
  };

  const update = (id: string) => {
    return Axios.put(`${import.meta.env.VITE_API_URL}/category/${id}`).then(
      (res) => res.data
    );
  };

  const remove = (id: string) => {
    return Axios.delete(`${import.meta.env.VITE_API_URL}/category/${id}`).then(
      (res) => res.data
    );
  };

  return {
    getAll,
    create,
    update,
    remove,
  };
}
