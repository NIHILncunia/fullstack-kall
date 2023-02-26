import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { axiosInstance } from '@/data/axios.data';
import { ICategory } from '@/types/tables.types';

export const useCategoryById = (categoryId: string) => {
  const fallback = [];
  const { data = fallback, } = useQuery<ICategory, AxiosError>(
    [ 'getCategory', categoryId, ],
    async () => {
      const { data, } = await axiosInstance.get<ICategory[]>('/category.json');
      const [ category, ] = data.filter((item) => item.id === categoryId);

      return category;
    },
    {
      staleTime: Infinity,
    }
  );

  return data as ICategory;
};
