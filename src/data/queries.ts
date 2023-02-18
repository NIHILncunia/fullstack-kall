import axios from 'axios';
import { ITodo, IUser } from '@/types/todos.types';
import { IProduct } from '@/types/tables.typea';

const baseUrl = 'https://my-json-server.typicode.com/NIHILncunia/kall-api';

export const getProducts = async () => {
  const res = await axios.get<IProduct[]>(`${baseUrl}/products?_sort=date&_order=desc`);

  return res.data;
};

export const getProductsHome = async () => {
  const res = await axios.get<IProduct[]>(`${baseUrl}/products?_sort=date&_order=desc&_limit=6`);

  return res.data;
};

export const getTodos = async () => {
  const res = await axios.get<ITodo[]>(`${baseUrl}/todos`);

  return res.data;
};

export const getTodo = async (id: string) => {
  const res = await axios.get<ITodo>(`${baseUrl}/todos/${id}`);

  return res.data;
};

export const getUsers = async () => {
  const res = await axios.get<IUser[]>(`${baseUrl}/users`);

  return res.data;
};
