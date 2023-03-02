import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { IProduct } from '@/types/tables.types';
import { axiosInstance } from '@/data/axios.data';
import { randomArray } from '@/utils';

export const getProducts = async () => {
  const { data, } = await axiosInstance.get<IProduct[]>('/products.json');

  return data;
};

export const useProducts = () => {
  const fallback = [];
  const { data = fallback, } = useQuery<IProduct[], AxiosError>(
    [ 'getProducts', ],
    getProducts

  );

  return data as IProduct[];
};

export const getProductsHome = async () => {
  const { data, } = await axiosInstance.get<IProduct[]>('/products.json');

  return data
    .slice(0, 6)
    .sort((a, b) => {
      const beforeDate = new Date(a.date).getTime();
      const afterDate = new Date(b.date).getTime();

      return afterDate - beforeDate;
    });
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
    }

  );

  return data as IProduct[];
};

export const getProductsByCategory = async (category: string) => {
  const { data, } = await axiosInstance.get<IProduct[]>('/products.json');

  return data.filter((item) => item.category_id === category);
};

export const useProductsByCategory = (category: string) => {
  const fallback = [];
  const { data = fallback, } = useQuery<IProduct[], AxiosError>(
    [ 'getProducts', category, ],
    () => getProductsByCategory(category)

  );

  return data as IProduct[];
};

export const getProductsById = async (id: number) => {
  const { data, } = await axiosInstance.get<IProduct[]>('/products.json');
  const [ product, ] = data.filter((item) => item.id === id);

  return product;
};

export const useProductsById = (id: number) => {
  const fallback = {};
  const { data = fallback, } = useQuery<IProduct, AxiosError>(
    [ 'getProduct', id, ],
    () => getProductsById(id)

  );

  return data as IProduct;
};

export const getOtherProducts = async (id: number, category: string) => {
  const { data, } = await axiosInstance.get<IProduct[]>('/products.json');

  const slicedData = data
    .filter((item) => item.category_id === category)
    .filter((item) => item.id !== id)
    .slice(0, 5);

  return randomArray(slicedData);
};

export const useOtherProducts = (id: number, category: string) => {
  const fallback = [];
  const { data = fallback, } = useQuery<IProduct[], AxiosError>(
    [ 'otherProducts', id, ],
    () => getOtherProducts(id, category)

  );

  return data as IProduct[];
};
