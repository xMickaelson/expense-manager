import axios from "axios";
import useAuth from "./useAuth";
import httpStatus from "http-status";
import { Budget } from "../interfaces/Budget";

export function useBudget() {
  const { user } = useAuth();

  const Axios = axios.create({
    headers: { Authorization: `Bearer ${user?.token}` },
    validateStatus: () => true,
  });

  const getAll = async (month: number, year: number) => {
    const response = await Axios.post(
      `${import.meta.env.VITE_API_URL}/budget`, {
        month,
        year
      }
    );
    const { message, data } = response.data;
    if (response.status !== httpStatus.OK) throw Error(message ?? "");

    return data;
  };

  const create = async (budget: Budget) => {
    const response = await Axios.post(
      `${import.meta.env.VITE_API_URL}/budget`,
      budget
    );

    const { message, data } = response.data;
    if (response.status !== httpStatus.OK) throw Error(message ?? "");

    return data;
  };

  const update = async (id: string, budget: Budget) => {
    const response = await Axios.put(
      `${import.meta.env.VITE_API_URL}/budget/${id}`,
      budget
    );

    const { message, data } = response.data;
    if (response.status !== httpStatus.OK) throw Error(message ?? "");

    return data;
  };

  return {
    getAll,
    create,
    update
  }
}