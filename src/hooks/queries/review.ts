import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { axiosInstance } from '@/data/axios.data';
import { IReview } from '@/types/tables.types';

export const getReviews = async () => {
  const { data, } = await axiosInstance.get<IReview[]>('/reviews.json');

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

export const useReviewById = (id: number) => {
  const fallback = {};
  const { data = fallback, } = useQuery<IReview, AxiosError>(
    [ 'getReview', id, ],
    async () => {
      const { data, } = await axiosInstance.get<IReview[]>('/reviews.json');
      const [ review, ] = data.filter((item) => item.id === id);

      return review;
    }

  );

  return data as IReview;
};
