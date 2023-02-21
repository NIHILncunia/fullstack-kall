import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { axiosInstance } from '@/data/axios.data';
import { IReview } from '@/types/tables.types';

export const useReviews = () => {
  const { data, } = useQuery<IReview[], AxiosError>(
    [ 'getReviews', ],
    async () => {
      const { data, } = await axiosInstance.get<IReview[]>('/reviews.json');

      return data;
    },
    {
      staleTime: 200000,
    }
  );

  return data;
};
