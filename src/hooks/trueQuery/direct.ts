import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { kallInstance } from '@/data/axios.data';
import { IDirect } from '@/types/tables.types';
import { IQueryOptions } from '@/types/other.types';

export const getDirects = async () => {
  const { data, } = await kallInstance.get<IDirect[]>('/directs');

  return data;
};

export const getDirectById = async (id: number) => {
  const { data, } = await kallInstance.get<IDirect>(`/directs/${id}`);

  return data;
};

export const getDirectByCategoryId = async (categoryId: string) => {
  const { data, } = await kallInstance.get<IDirect[]>(
    `/directs/category?category_id=${categoryId}`
  );

  return data;
};

export const getDirectByUserId = async (userId: string) => {
  const { data, } = await kallInstance.get<IDirect[]>(
    `/directs/user?user_id=${userId}`
  );

  return data;
};

export const useDirects = () => {
  const { data = [], } = useQuery<IDirect[], AxiosError>(
    [ 'getDirects', ],
    getDirects
  );

  return data as IDirect[];
};

export const useDirectById = (id: number, options?: IQueryOptions) => {
  const { data = {}, } = useQuery<IDirect, AxiosError>(
    [ 'getDirectById', id, ],
    () => getDirectById(id),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IDirect;
};

export const useDirectByCategoryId = (categoryId: string, options?: IQueryOptions) => {
  const { data = [], } = useQuery<IDirect[], AxiosError>(
    [ 'getDirectByCategoryId', categoryId, ],
    () => getDirectByCategoryId(categoryId),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IDirect[];
};

export const useDirectByUserId = (userId: string, options?: IQueryOptions) => {
  const { data = [], } = useQuery<IDirect[], AxiosError>(
    [ 'getDirectByUserId', userId, ],
    () => getDirectByUserId(userId),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IDirect[];
};
