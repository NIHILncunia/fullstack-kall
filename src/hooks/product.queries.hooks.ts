import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { IProduct } from '@/types/tables.types';
import { axiosInstance } from '@/data/axios.data';

export const useProducts = () => {
  const fallback = [];
  const { data = fallback, } = useQuery<IProduct[], AxiosError>(
    [ 'getProducts', ],
    async () => {
      const { data, } = await axiosInstance.get<IProduct[]>('/products.json');

      return data;
    },
    {
      staleTime: 20000,
    }
  );

  return data;
};

export const useProductsHome = () => {
  const fallback = [];
  const { data = fallback, } = useQuery<IProduct[], AxiosError>(
    [ 'getProducts', ],
    async () => {
      const { data, } = await axiosInstance.get<IProduct[]>('/products.json');

      return data
        .slice(0, 6)
        .sort((a, b) => {
          const beforeDate = new Date(a.date).getTime();
          const afterDate = new Date(b.date).getTime();

          return afterDate - beforeDate;
        });
    },
    {
      staleTime: 20000,
    }
  );

  return data;
};

export const useProductsByCategory = (category: string) => {
  const fallback = [];
  const { data = fallback, } = useQuery<IProduct[], AxiosError>(
    [ 'getProducts', category, ],
    async () => {
      const { data, } = await axiosInstance.get<IProduct[]>('/products.json');

      return data.filter((item) => item.category_id === category);
    },
    {
      staleTime: 20000,
    }
  );

  return data;
};

export const useProductsById = (id: number) => {
  const fallback = {};
  const { data = fallback, } = useQuery<IProduct, AxiosError>(
    [ 'getProduct', id, ],
    async () => {
      const { data, } = await axiosInstance.get<IProduct[]>('/products.json');
      const [ product, ] = data.filter((item) => item.id === id);

      return product;
    },
    {
      staleTime: 20000,
    }
  );

  return data;
};
