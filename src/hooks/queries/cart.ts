import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { ICart } from '@/types/tables.types';
import { axiosInstance } from '@/data/axios.data';

export const getCartByUserId = async (userId: string) => {
  const { data, } = await axiosInstance.get<ICart[]>('/cart.json');

  return data.filter((item) => item.user_id === userId);
};

export const useCartByUserId = (userId: string) => {
  const fallback = [];
  const { data = fallback, } = useQuery<ICart[], AxiosError>(
    [ 'getCart', userId, ],
    () => getCartByUserId(userId)

  );

  return data as ICart[];
};
