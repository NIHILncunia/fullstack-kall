import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { kallInstance } from '@/data/axios.data';
import { ICategory } from '@/types/tables.types';
import { IQueryOptions } from '@/types/other.types';

export const getCategories = async () => {
  const { data, } = await kallInstance.get<ICategory[]>('/categories');

  return data;
};

export const getCategoryById = async (id: string) => {
  console.log('어떤 카테고리가 불러와질까? >> ', id);
  const { data, } = await kallInstance.get<ICategory>(`/categories/${id}`);

  return data;
};

export const useCategories = () => {
  const { data = [], } = useQuery<ICategory[], AxiosError>(
    [ 'getCategories', ],
    getCategories
  );

  return data as ICategory[];
};

export const useCategoryById = (id: string, options?: IQueryOptions) => {
  const { data = {}, } = useQuery<ICategory, AxiosError>(
    [ 'getCategoryById', id, ],
    () => getCategoryById(id),
    {
      enabled: id !== undefined && id !== null && (options?.enabled ?? true),
    }
  );

  return data as ICategory;
};
