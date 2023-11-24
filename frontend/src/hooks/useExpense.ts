import axios from "axios";
import useAuth from "./useAuth";
import httpStatus from "http-status";
import { Expense } from "../interfaces/Expense";

export function useExpense() {
  const { user } = useAuth();

  const Axios = axios.create({
    headers: { Authorization: `Bearer ${user?.token}` },
    validateStatus: () => true,
  });

  const getAll = async () => {
    const response = await Axios.post(
      `${import.meta.env.VITE_API_URL}/expense` 
    );
    const { message, data } = response.data;
    if (response.status !== httpStatus.OK) throw Error(message ?? "");

    return data;
  };

  const create = async (expense: Expense) => {
    const response = await Axios.post(
      `${import.meta.env.VITE_API_URL}/expense/create`,
      expense
    );

    const { message, data } = response.data;
    if (response.status !== httpStatus.OK) throw Error(message ?? "");

    return data;
  };

  const update = async (id: string, expense: Expense) => {
    const response = await Axios.put(
      `${import.meta.env.VITE_API_URL}/expense/${id}`,
      expense
    );

    const { message, data } = response.data;
    if (response.status !== httpStatus.OK) throw Error(message ?? "");

    return data;
  };

  const remove = async (id: string) => {
    const response = await Axios.delete(`${import.meta.env.VITE_API_URL}/expense/${id}`)

    const { message, data } = response.data;
    if (response.status !== httpStatus.OK) throw Error(message ?? "Some Error Occurred");

    return data;
  };

  return {
    getAll,
    create,
    update,
    remove
  }
}