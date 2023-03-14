import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { kallInstance } from '@/data/axios.data';
import { IOrderDetail } from '@/types/tables.types';
import { IQueryOptions } from '@/types/other.types';

export const getOrderDetails = async () => {
  const { data, } = await kallInstance.get<IOrderDetail[]>('/orderdetails');

  return data;
};

export const getOrderDetailById = async (id: number) => {
  const { data, } = await kallInstance.get<IOrderDetail>(`/orderdetails/${id}`);

  return data;
};

export const getOrderDetailByOrderId = async (orderId: number) => {
  const { data, } = await kallInstance
    .get<IOrderDetail[]>(`/orderdetails/order/${orderId}`);

  return data;
};

export const useOrderDetails = () => {
  const { data = [], } = useQuery<IOrderDetail[], AxiosError>(
    [ 'getOrderDetails', ],
    getOrderDetails
  );

  return data as IOrderDetail[];
};

export const useOrderDetailById = (id: number, options?: IQueryOptions) => {
  const { data = {}, } = useQuery<IOrderDetail, AxiosError>(
    [ 'getOrderDetailById', id, ],
    () => getOrderDetailById(id),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IOrderDetail;
};

export const useOrderDetailByOrderId = (orderId: number, options?: IQueryOptions) => {
  const { data = [], } = useQuery<IOrderDetail[], AxiosError>(
    [ 'getOrderDetailByOrderId', orderId, ],
    () => getOrderDetailByOrderId(orderId),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IOrderDetail[];
};
