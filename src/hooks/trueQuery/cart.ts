import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { kallInstance } from '@/data/axios.data';
import { ICart } from '@/types/tables.types';
import { IQueryOptions } from '@/types/other.types';

export const getCarts = async () => {
  const { data, } = await kallInstance.get<ICart[]>('/carts');

  return data;
};

export const getCartByUserId = async (userId: string) => {
  const { data, } = await kallInstance.get<ICart[]>(`/carts/user/${userId}`);

  return data;
};

// ==================== 모든 데이터 가져오기 ====================
export const useCarts = () => {
  const { data = [], } = useQuery<ICart[], AxiosError>(
    [ 'getCarts', ],
    getCarts,
    {}
  );

  return data as ICart[];
};

// ==================== 유저별 데이터 가져오기 ====================
export const useCartByUserId = (userId: string, options?: IQueryOptions) => {
  const { data = [], } = useQuery<ICart[], AxiosError>(
    [ 'getCartByUserId', userId, ],
    () => getCartByUserId(userId),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as ICart[];
};

export const useCreateCart = (userId: string) => {
  const qc = useQueryClient();

  const { mutate, } = useMutation<void, AxiosError, ICart[]>(
    async (createData) => {
      const { data, } = await kallInstance.post('/carts', createData);

      return data;
    },
    {
      onSuccess: () => {
        qc.refetchQueries([ 'getCartByUserId', userId, ]);
      },
    }
  );

  return { mutate, };
};

export const useDeleteCart = (userId: string) => {
  const qc = useQueryClient();

  const { mutate, } = useMutation<void, AxiosError, number[]>(
    async (deleteData) => {
      const { data, } = await kallInstance.delete('/carts', {
        data: deleteData,
      });

      return data;
    },
    {
      onSuccess: () => {
        qc.refetchQueries([ 'getCartByUserId', userId, ]);
      },
    }
  );

  return { mutate, };
};
