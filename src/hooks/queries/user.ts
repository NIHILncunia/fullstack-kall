import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { axiosInstance } from '@/data/axios.data';
import { IUser } from '@/types/tables.types';

export const getUsers = async () => {
  const { data, } = await axiosInstance.get<IUser[]>('/users.json');

  return data;
};

export const useUsers = () => {
  const fallback = [];
  const { data = fallback, } = useQuery<IUser[], AxiosError>(
    [ 'getUsers', ],
    getUsers,
    {
      staleTime: 30000,
      refetchInterval: 60000,
    }
  );

  return data as IUser[];
};

export const getUser = async (id: string) => {
  const { data, } = await axiosInstance.get<IUser[]>('/users.json');
  const [ user, ] = data.filter((item) => item.id === id);

  return user;
};

export const useUser = (id: string) => {
  const fallback = {};
  const { data = fallback, } = useQuery<IUser, AxiosError>(
    [ 'getUser', id, ],
    () => getUser(id),
    {
      staleTime: 30000,
      refetchInterval: 60000,
    }
  );

  return data as IUser;
};
