import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { kallInstance } from '@/data/axios.data';
import { IReviewComment } from '@/types/tables.types';
import { IQueryOptions } from '@/types/other.types';

export const getReviewComments = async () => {
  const { data, } = await kallInstance.get<IReviewComment[]>(
    '/reviewcomments'
  );

  return data;
};

export const getReviewCommentById = async (id: number) => {
  const { data, } = await kallInstance.get<IReviewComment>(
    `/reviewcomments/${id}`
  );

  return data;
};

export const getReviewCommentByReviewId = async (reviewId: number) => {
  const { data, } = await kallInstance.get<IReviewComment[]>(
    `/reviewcomments/review?review_nb=${reviewId}`
  );

  return data;
};

export const useReviewComments = () => {
  const { data = [], } = useQuery<IReviewComment[], AxiosError>(
    [ 'getReviewComments', ],
    getReviewComments
  );

  return data as IReviewComment[];
};

export const useReviewCommentById = (id: number, options?: IQueryOptions) => {
  const { data = {}, } = useQuery<IReviewComment, AxiosError>(
    [ 'getReviewCommentById', id, ],
    () => getReviewCommentById(id),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IReviewComment;
};

export const useReviewCommentByReviewId = (reviewId: number, options?: IQueryOptions) => {
  const { data = [], } = useQuery<IReviewComment[], AxiosError>(
    [ 'getReviewCommentByReviewId', reviewId, ],
    () => getReviewCommentByReviewId(reviewId),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IReviewComment[];
};
