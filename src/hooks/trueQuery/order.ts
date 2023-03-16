import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { kallInstance } from '@/data/axios.data';
import { IOrder, IOrderDetail } from '@/types/tables.types';
import { IQueryOptions } from '@/types/other.types';

export const getOrders = async (role?: string) => {
  const url = role === 'admin' ? '/admin' : '';
  const { data, } = await kallInstance.get<IOrder[]>(`${url}/orders`);

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
export const useOrders = (role?: string) => {
  const { data = [], } = useQuery<IOrder[], AxiosError>(
    [ 'getOrders', ],
    () => getOrders(role)
  );

  return data as IOrder[];
};

// ==================== 개별 주문 가져오기 ====================
export const useOrderById = (id: number, role?: string, options?: IQueryOptions) => {
  console.log(id);
  const { data = [], } = useQuery<IOrder, AxiosError>(
    [ 'getOrderById', id, ],
    () => getOrderById(id, role),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IOrder;
};

// ==================== 주문 상세 품목 가져오기 ====================
export const useOrderDetailByOrderId = (id: number) => {
  const { data = [], } = useQuery<IOrderDetail[], AxiosError>(
    [ 'getOrderDetailByOrderid', id, ],
    async () => {
      const { data, } = await kallInstance.get<IOrderDetail[]>(`/admin/orders/detail/${id}`);

      return data;
    },
    {}
  );

  return data;
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

// ==================== 주문 아이템 생성 ====================
export const useCreateOrderDetail = (userId: string) => {
  const { mutate, } = useMutation<void, AxiosError, IOrderDetail[]>(
    async (createData) => {
      const { data, } = await kallInstance.post(`/orders/details/${userId}`, createData);

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

// ==================== 주문 아이템 제거 (상태변경) ====================
export const useDeleteOrderItem = () => {
  const { mutate, } = useMutation(
    async (orderDNb: number) => {
      const { data, } = await kallInstance.put(`/admin/orders/pdelete/${orderDNb}`);

      return data;
    },
    {}
  );

  return { mutate, };
};

// ==================== 주문 제거 (상태변경) ====================
export const useDeleteOrder = (id: number) => {
  interface Update {
    data: IOrder;
  }

  const { mutate, } = useMutation<void, AxiosError, Update>(
    async (updateData) => {
      const { data: udata, } = updateData;
      const { data, } = await kallInstance.post(`/admin/orders/${id}`, udata);

      return data;
    },
    {}
  );

  return { mutate, };
};

// ==================== 바로 주문 ====================
export const useDirectBuy = () => {
  const { mutate, } = useMutation<void, AxiosError, IOrderDetail[]>(
    async (detailsArray) => {
      const { data, } = await kallInstance.post('/orders/directbuy', detailsArray);

      return data;
    },
    {}
  );

  return { mutate, };
};
