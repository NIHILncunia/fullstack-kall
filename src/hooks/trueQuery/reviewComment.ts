import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { kallInstance } from '@/data/axios.data';
import { IReviewComment } from '@/types/tables.types';
import { IQueryOptions } from '@/types/other.types';

export const getReviewCommentById = async (id: number, role?: string) => {
  const url = role === 'admin' ? '/admin' : '';

  const { data, } = await kallInstance.get<IReviewComment>(
    `${url}/reviewcomments/${id}`
  );

  return data;
};

export const getReviewCommentByReviewId = async (reviewId: number, role?: string) => {
  const url = role === 'admin' ? '/admin' : '';

  const { data, } = await kallInstance.get(`${url}/reviewcomments/review/${reviewId}`);

  return data;
};

export const useReviewCommentById = (id: number, role?: string, options?: IQueryOptions) => {
  const { data = {}, } = useQuery<IReviewComment, AxiosError>(
    [ 'getReviewCommentById', id, ],
    () => getReviewCommentById(id, role),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IReviewComment;
};

export const useReviewCommentByReviewId = (reviewId: number, role?: string, options?: IQueryOptions) => {
  const { data = [], } = useQuery<IReviewComment[], AxiosError>(
    [ 'getReviewCommentByReviewId', reviewId, ],
    () => getReviewCommentByReviewId(reviewId, role),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IReviewComment[];
};

// ==================== 덧글 추가 ====================
export const useCreateReviewComment = () => {
  const { mutate, } = useMutation<void, AxiosError, IReviewComment>(
    async (commentData) => {
      const { data, } = await kallInstance.post('/reviewcomments', commentData);

      return data;
    },
    {}
  );

  return { mutate, };
};
// ==================== 덧글 수정 ====================
export const useUpdateReviewComment = (commentId: number) => {
  interface Update {
    data: IReviewComment;
    role?: string;
  }

  const { mutate, } = useMutation<void, AxiosError, Update>(
    async (updateData) => {
      const { data: uData, role, } = updateData;
      const url = role === 'admin' ? '/admin' : '';
      const { data, } = await kallInstance.put(`${url}/reviewcomments/${commentId}`, uData);

      return data;
    },
    {}
  );

  return { mutate, };
};

// ==================== 덧글 삭제 ====================
export const useDeleteReviewComment = (commentId: number) => {
  const { mutate, } = useMutation(
    async (role?: string) => {
      const url = role === 'admin' ? '/admin' : '';
      const { data, } = await kallInstance.delete(`${url}/reviewcomments/${commentId}`);

      return data;
    },
    {}
  );

  return { mutate, };
};
