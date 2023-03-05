import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { kallInstance } from '@/data/axios.data';
import { IOrder } from '@/types/tables.types';

export const getOrders = async () => {
  const { data, } = await kallInstance.get<IOrder[]>('/orders');

  return data;
};

export const getOrderById = async (id: number) => {
  const { data, } = await kallInstance.get<IOrder[]>(`/orders/${id}`);

  return data;
};

export const getOrderByUserId = async (userId: string) => {
  const { data, } = await kallInstance.get<IOrder[]>(`/orders?user_id=${userId}`);

  return data;
};

// ==================== 전체 주문 가져오기 ====================
export const useOrders = () => {
  const { data = [], } = useQuery<IOrder[], AxiosError>(
    [ 'getOrders', ],
    getOrders
  );

  return data as IOrder[];
};

// ==================== 개별 주문 가져오기 ====================
export const useOrderById = (id: number) => {
  const { data = [], } = useQuery<IOrder[], AxiosError>(
    [ 'getOrderById', id, ],
    () => getOrderById(id)
  );

  return data as IOrder[];
};

// ==================== 유저 주문 가져오기 ====================
export const useOrderByUserId = (userId: string) => {
  const { data = [], } = useQuery<IOrder[], AxiosError>(
    [ 'getOrderByUserId', userId, ],
    () => getOrderByUserId(userId)
  );

  return data as IOrder[];
};

// ====================  ====================
// ====================  ====================
// ====================  ====================
// ====================  ====================
