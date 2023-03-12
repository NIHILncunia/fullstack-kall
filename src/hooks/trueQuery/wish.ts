import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { kallInstance } from '@/data/axios.data';
import { IWish } from '@/types/tables.types';
import { IQueryOptions } from '@/types/other.types';

export const getWishlists = async () => {
  const { data, } = await kallInstance.get<IWish[]>('/wishlists');

  return data;
};

export const getWishlistById = async (id: number) => {
  const { data, } = await kallInstance.get<IWish>(`/wishlists/${id}`);

  return data;
};

export const getWishlistByUserId = async (userId: string) => {
  const { data, } = await kallInstance.get<IWish[]>(`/wishlists/user?user_id=${userId}`);

  return data;
};

export const getWishlistByProductId = async (productId: number) => {
  const { data, } = await kallInstance.get<IWish>(`/wishlists/product?product_id=${productId}`);

  return data[0];
};

// ==================== 전체 데이터 가져오기 ====================
export const useWishlists = () => {
  const { data = [], } = useQuery<IWish[], AxiosError>(
    [ 'getWishlists', ],
    getWishlists,
    {}
  );

  return data;
};

// ==================== 개별 데이터 가져오기 ====================
export const useWishlistById = (id: number, options?: IQueryOptions) => {
  const { data = {}, } = useQuery<IWish, AxiosError>(
    [ 'getWishlistById', id, ],
    () => getWishlistById(id),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data;
};

// ==================== 유저별 데이터 가져오기 ====================
export const useWishlistByUserId = (userId: string, options?: IQueryOptions) => {
  const { data = [], } = useQuery<IWish[], AxiosError>(
    [ 'getWishlistByUserId', userId, ],
    () => getWishlistByUserId(userId),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data;
};

// ==================== 찜한 상품 가져오기 ====================
export const useWishlistByProductId = (productId: number, options?: IQueryOptions) => {
  const { data = {}, } = useQuery<IWish, AxiosError>(
    [ 'getWishlistByProductId', productId, ],
    () => getWishlistByProductId(productId),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data;
};

// ==================== 데이터 추가 ====================
export const useCreateWishlist = (userId: string) => {
  const [ message, setMessage, ] = useState('');

  const queryClient = useQueryClient();

  const { mutate, } = useMutation<string, AxiosError, IWish>(
    async (createData) => {
      const { data, } = await kallInstance.post<string>('/wishlists', createData);

      return data;
    },
    {
      onSuccess: async (data) => {
        const wishlists = await getWishlistByUserId(userId);

        // queryClient.invalidateQueries([ 'getWishlistByUserId', userId, ]);
        queryClient.setQueryData([ 'getWishlistByUserId', userId, ], wishlists);

        setMessage(data);
      },
    }
  );

  return { mutate, message, };
};

// ==================== 데이터 제거 ====================
export const useDeleteWishlist = (userId: string) => {
  const [ message, setMessage, ] = useState('');

  const queryClient = useQueryClient();

  const { mutate, } = useMutation<string, AxiosError, number>(
    async (id: number) => {
      const { data, } = await kallInstance.delete<string>(`/wishlists/${id}`);

      return data;
    },
    {
      onSuccess: async (data) => {
        const wishlists = await getWishlistByUserId(userId);

        queryClient.invalidateQueries([ 'getWishlistByUserId', userId, ]);

        setMessage(data);
      },
    }
  );

  return { mutate, message, };
};
