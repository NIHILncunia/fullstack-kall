import { useMutation, useQuery } from 'react-query';
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
export const useCreateOrder = () => {
  const { mutate, } = useMutation<void, AxiosError, IOrder>(
    async (createData) => {
      const { data, } = await kallInstance.post('/orders', createData);

      return data;
    }
  );

  return { mutate, };
};

// ==================== 주문 수정 (상태 수정) ====================
export const useUpdateOrder = (id: number) => {
  interface Update {
    data: IOrder;
    role?: string;
  }

  const { mutate, } = useMutation<void, AxiosError, Update>(
    async (updateData) => {
      const { data: udata, role, } = updateData;
      const url = role === 'admin' ? '/admin' : '';

      const { data, } = await kallInstance.put(`${url}/orders/${id}`, udata);

      return data;
    },
    {}
  );

  return { mutate, };
};

// ==================== 주문 수정 (삭제용) ====================
export const useDeleteOrder = () => {
  const { mutate, } = useMutation(
    async (id: number) => {
      const { data, } = await kallInstance.put(`/orders/${id}`);

      return data;
    },
    {}
  );

  return { mutate, };
};

// ==================== 주문 수정 (일괄 삭제용) ====================
export const useDeleteOrders = () => {
  const { mutate, } = useMutation(
    async (ids: number[]) => {
      const { data, } = await kallInstance.put('/orders', {
        data: ids,
      });

      return data;
    },
    {}
  );

  return { mutate, };
};
