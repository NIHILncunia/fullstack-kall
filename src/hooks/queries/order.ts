import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { axiosInstance } from '@/data/axios.data';
import { IOrder, IOrderDetail } from '@/types/tables.types';

export const useOrders = () => {
  const fallback = [];
  const { data = fallback, } = useQuery<IOrder[], AxiosError>(
    [ 'getOrders', ],
    async () => {
      const { data, } = await axiosInstance.get<IOrder[]>('/order.json');

      return data;
    }

  );

  return data as IOrder[];
};

export const useOrderById = (id: number) => {
  const fallback = {};
  const { data = fallback, } = useQuery<IOrder, AxiosError>(
    [ 'getOrder', id, ],
    async () => {
      const { data, } = await axiosInstance.get<IOrder[]>('/order.json');
      const [ order, ] = data.filter((item) => item.id === id);

      return order;
    }

  );

  return data as IOrder;
};

export const useOrderDetails = () => {
  const fallback = [];
  const { data = fallback, } = useQuery<IOrderDetail[], AxiosError>(
    [ 'getOrderDetails', ],
    async () => {
      const { data, } = await axiosInstance.get<IOrderDetail[]>('/order_detail.json');

      return data;
    }

  );

  return data as IOrderDetail[];
};

export const useOrderDetailByOrderId = (orderId: number) => {
  const fallback = [];
  const { data = fallback, } = useQuery<IOrderDetail[], AxiosError>(
    [ 'getOrderDetails', orderId, ],
    async () => {
      const { data, } = await axiosInstance.get<IOrderDetail[]>('/order_detail.json');
      const filteredData = data.filter((item) => (
        item.order_id === orderId
      ));

      return filteredData;
    }

  );

  return data as IOrderDetail[];
};
