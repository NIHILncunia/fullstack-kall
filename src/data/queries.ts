import axios from 'axios';
import { ITodo, IUser } from '@/types/todos.types';

const baseUrl = 'https://my-json-server.typicode.com/NIHILncunia/json-server-test';

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
