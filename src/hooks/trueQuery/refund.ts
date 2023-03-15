import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { kallInstance } from '@/data/axios.data';
import { IRefund } from '@/types/tables.types';

export const getRefunds = async () => {
  const { data, } = await kallInstance.get<IRefund[]>(`/admin/refunds`);

  return data;
};

export const getRefundById = async (id: number, role?: string) => {
  const url = role === 'admin' ? '/admin' : '';
  const { data, } = await kallInstance.get<IRefund>(`${url}/refunds/${id}`);

  return data;
};

export const getRefundByUserId = async (userId: string, role?: string) => {
  const url = role === 'admin' ? '/admin' : '';
  const { data, } = await kallInstance.get<IRefund[]>(`${url}/refunds/user/${userId}`);

  return data;
};

// ==================== 모든 반품 데이터 가져오기 ====================
export const useRefunds = () => {
  const { data = [], } = useQuery<IRefund[], AxiosError>(
    [ 'getRefunds', ],
    getRefunds
  );

  return data as IRefund[];
};

// ==================== 하나의 반품 데이터 가져오기 ====================
export const useRefundById = (id: number, role?: string) => {
  const { data = {}, } = useQuery<IRefund, AxiosError>(
    [ 'getRefundById', id, ],
    () => getRefundById(id, role)
  );

  return data as IRefund;
};

// ==================== 유저에 대한 반품 데이터 가져오기 ====================
export const useRefundByUserId = (userId: string) => {
  const { data = [], } = useQuery<IRefund[], AxiosError>(
    [ 'getRefundByUserId', userId, ],
    () => getRefundByUserId(userId)
  );

  return data as IRefund[];
};

// ==================== 반품 요청 ====================
export const useCreateRefund = (userId: string) => {
  const [ message, setMessage, ] = useState('');
  const queryClient = useQueryClient();

  const { mutate, } = useMutation<string, AxiosError, FormData>(
    async (refundData) => {
      const { data, } = await kallInstance.post<string>('/refunds', refundData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return data;
    },
    {
      onSuccess: async (data) => {
        const userRefund = getRefundByUserId(userId);

        queryClient.setQueryData(
          [ 'getRefundByUserId', userId, ],
          userRefund
        );

        setMessage(data);
      },
    }
  );

  return { mutate, message, };
};
// ==================== 어드민 반품 수정 ====================
export const useUpdateRefund = (id: number) => {
  const { mutate, } = useMutation<void, AxiosError, IRefund>(
    async (updateData) => {
      const { data, } = await kallInstance.put(`/admin/refunds/${id}`, updateData);

      return data;
    },
    {}
  );

  return { mutate, };
};
