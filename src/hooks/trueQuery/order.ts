import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { kallInstance } from '@/data/axios.data';
import { IOrder } from '@/types/tables.types';
import { IQueryOptions } from '@/types/other.types';

export const getOrders = async () => {
  const { data, } = await kallInstance.get<IOrder[]>('/orders');

  return data;
};

export const getOrderById = async (id: number) => {
  const { data, } = await kallInstance.get<IOrder>(`/orders/${id}`);

  return data;
};

export const getOrderByUserId = async (userId: string) => {
  const { data, } = await kallInstance.get<IOrder[]>(`/orders/user/${userId}`);

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
export const useOrderById = (id: number, options?: IQueryOptions) => {
  const { data = [], } = useQuery<IOrder, AxiosError>(
    [ 'getOrderById', id, ],
    () => getOrderById(id),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IOrder;
};

// ==================== 유저 주문 가져오기 ====================
export const useOrderByUserId = (userId: string, options?: IQueryOptions) => {
  const { data = [], } = useQuery<IOrder[], AxiosError>(
    [ 'getOrderByUserId', userId, ],
    () => getOrderByUserId(userId),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IOrder[];
};

// ====================  ====================
// ====================  ====================
// ====================  ====================
// ====================  ====================
