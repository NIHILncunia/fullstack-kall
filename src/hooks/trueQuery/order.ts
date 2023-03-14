import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { kallInstance } from '@/data/axios.data';
import { IOrder } from '@/types/tables.types';
import { IQueryOptions } from '@/types/other.types';

export const getOrders = async () => {
  const { data, } = await kallInstance.get<IOrder[]>('/admin/orders');

  return data;
};

export const getOrderById = async (id: number, role?: string) => {
  const url = role === 'admin' ? '/admin' : '';
  const { data, } = await kallInstance.get<IOrder>(`${url}/orders/${id}`);

  return data;
};

export const getOrderByUserId = async (userId: string, role?: string) => {
  const url = role === 'admin' ? '/admin' : '';
  const { data, } = await kallInstance.get<IOrder[]>(`${url}/orders/user/${userId}`);

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
export const useOrderById = (id: number, role?: string, options?: IQueryOptions) => {
  const { data = [], } = useQuery<IOrder, AxiosError>(
    [ 'getOrderById', id, ],
    () => getOrderById(id, role),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IOrder;
};

// ==================== 유저 주문 가져오기 ====================
export const useOrderByUserId = (userId: string, role?: string, options?: IQueryOptions) => {
  const { data = [], } = useQuery<IOrder[], AxiosError>(
    [ 'getOrderByUserId', userId, ],
    () => getOrderByUserId(userId, role),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IOrder[];
};

// ==================== 주문 생성 ====================
// export const use

// ==================== 주문 수정 () ====================
// ==================== 주문 수정 (삭제용) ====================
// ==================== 주문 수정 (일괄 삭제용) ====================
