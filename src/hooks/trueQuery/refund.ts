import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { kallInstance } from '@/data/axios.data';
import { IRefund } from '@/types/tables.types';

export const getRefunds = async () => {
  const { data, } = await kallInstance.get<IRefund[]>('/refunds');

  return data;
};

export const getRefundById = async (id: number) => {
  const { data, } = await kallInstance.get<IRefund>(`/refunds/${id}`);

  return data;
};

export const getRefundByUserId = async (userId: string) => {
  const { data, } = await kallInstance.get<IRefund[]>(`/refunds/user?user_id=${userId}`);

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
export const useRefundById = (id: number) => {
  const { data = {}, } = useQuery<IRefund, AxiosError>(
    [ 'getRefundById', id, ],
    () => getRefundById(id)
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

// ====================  ====================
// ====================  ====================
// ====================  ====================
// ====================  ====================
// ====================  ====================
// ====================  ====================
