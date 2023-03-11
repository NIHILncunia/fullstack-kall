import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { kallInstance } from '@/data/axios.data';
import { IReview } from '@/types/tables.types';
import { IQueryOptions } from '@/types/other.types';

export const getReviews = async () => {
  const { data, } = await kallInstance.get<IReview[]>('/reviews');

  return data;
};

export const getReviewById = async (id: number) => {
  const { data, } = await kallInstance.get<IReview>(`/reviews/${id}`);

  return data;
};

export const getReviewByOrderDnb = async (orderDnb: number) => {
  const { data, } = await kallInstance.get<IReview[]>(
    `/reviews/orderdetail?order_dnb=${orderDnb}`
  );

  return data;
};

export const getReviewByUserId = async (userId: string) => {
  const { data, } = await kallInstance.get<IReview[]>(`/reviews/user?user_id=${userId}`);

  return data;
};

export const useReviews = () => {
  const fallback = [];
  const { data = fallback, } = useQuery<IReview[], AxiosError>(
    [ 'getReviews', ],
    getReviews

  );

  return data as IReview[];
};

export const useReviewById = (id: number, options?: IQueryOptions) => {
  const fallback = {};
  const { data = fallback, } = useQuery<IReview, AxiosError>(
    [ 'getReviewById', id, ],
    () => getReviewById(id),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IReview;
};

export const useReviewByOrderDnb = (orderDnb: number, options?: IQueryOptions) => {
  const { data = [], } = useQuery<IReview[], AxiosError>(
    [ 'getReviewByOrderDnb', orderDnb, ],
    () => getReviewByOrderDnb(orderDnb),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IReview[];
};

export const useReviewByUserId = (userId: string, options?: IQueryOptions) => {
  const { data = [], } = useQuery<IReview[], AxiosError>(
    [ 'getReviewByUserId', userId, ],
    () => getReviewByUserId(userId),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IReview[];
};
