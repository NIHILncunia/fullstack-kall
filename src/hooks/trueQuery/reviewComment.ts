import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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

export const getReviewCommentByReviewId = async (reviewId: number, role = 'user') => {
  const url = role === 'admin'
    ? `/admin/reviews/comment/${reviewId}`
    : `/reviews/comment/${reviewId}`;

  const { data, } = await kallInstance.get<IReviewComment[]>(url);

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

// ==================== 덧글 수정 ====================
export const useUpdateReviewComment = (reviewId: number) => {
  const qc = useQueryClient();
  interface UpdateData {
    rcId: number;
    data: IReviewComment;
    role?: string;
  }
  const { mutate, } = useMutation<void, AxiosError, UpdateData>(
    async (updateData: UpdateData) => {
      const { rcId, } = updateData;
      const url = updateData.role === 'admin'
        ? `/admin/reviews/comment/${rcId}`
        : `/reviews/comment/${rcId}`;

      const { data, } = await kallInstance.put(url);

      return data;
    },
    {
      onSuccess: () => {
        qc.refetchQueries([ 'getReviewCommentByReviewId', reviewId, ]);
      },
    }
  );

  return { mutate, };
};

// ==================== 덧글 삭제 ====================
export const useDeleteReviewComment = (reviewId: number) => {
  const qc = useQueryClient();

  interface DeleteData {
    role?: string;
    rcId: number;
  }

  const { mutate, } = useMutation<void, AxiosError, DeleteData>(
    async (deleteData: DeleteData) => {
      const { rcId, role, } = deleteData;
      const url = role === 'admin'
        ? `/admin/reviews/comment/${rcId}`
        : `/reviews/comment/${rcId}`;

      const { data, } = await kallInstance.delete(url);

      return data;
    },
    {
      onSuccess: () => {
        qc.refetchQueries([ 'getReviewCommentByReviewId', reviewId, ]);
      },
    }
  );

  return { mutate, };
};
