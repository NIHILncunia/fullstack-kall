import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { kallInstance } from '@/data/axios.data';
import { IReview } from '@/types/tables.types';
import { IQueryOptions } from '@/types/other.types';

export const getReviews = async (role = 'user') => {
  const url = role === 'admin' ? '/admin/reviews' : '/reviews';
  const { data, } = await kallInstance.get<IReview[]>(url);

  return data;
};

export const getReviewById = async (id: number, role = 'user') => {
  const url = role === 'admin' ? `/admin/reviews/${id}` : `/reviews/${id}`;
  const { data, } = await kallInstance.get<IReview>(url);

  return data;
};

export const getReviewByOrderDnb = async (orderDnb: number) => {
  const { data, } = await kallInstance.get<IReview[]>(
    `/reviews/orderdetail?order_dnb=${orderDnb}`
  );

  return data;
};

export const getReviewByUserId = async (userId: string) => {
  const { data, } = await kallInstance.get<IReview[]>(`/reviews/user/${userId}`);

  return data;
};

export const getReviewByProductId = async (productId: number) => {
  const { data, } = await kallInstance.get<IReview[]>(`/reviews/product/${productId}`);

  return data;
};

export const useReviews = (role?: string) => {
  const fallback = [];
  const { data = fallback, } = useQuery<IReview[], AxiosError>(
    [ 'getReviews', ],
    () => getReviews(role)

  );

  return data as IReview[];
};

export const useReviewById = (id: number, role?: string, options?: IQueryOptions) => {
  const fallback = {};
  const { data = fallback, } = useQuery<IReview, AxiosError>(
    [ 'getReviewById', id, ],
    () => getReviewById(id, role),
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

export const useReviewByProductId = (productId: number, options?: IQueryOptions) => {
  const { data = [], } = useQuery<IReview[], AxiosError>(
    [ 'getReviewByProductId', productId, ],
    () => getReviewByProductId(productId),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IReview[];
};

// ==================== 리뷰 작성 ====================
// ==================== 리뷰 수정 ====================
export const useUpdateReview = (reviewId: number) => {
  const queryClient = useQueryClient();

  interface UpdateData {
    data: IReview;
    role?: string;
  }

  const { mutate, } = useMutation<IReview, AxiosError, UpdateData>(
    async (updateData: UpdateData) => {
      const url = updateData.role === 'admin'
        ? `/admin/reviews/${reviewId}`
        : `/reviews/${reviewId}`;

      const { data, } = await kallInstance.put<IReview>(url, updateData.data);

      return data;
    },
    {
      onSuccess: async () => {
        queryClient.refetchQueries([ 'getReviewById', reviewId, ]);
      },
    }
  );

  return { mutate, };
};

// ==================== 리뷰 삭제 ====================
export const useDeleteReview = (reviewId: number) => {
  const qc = useQueryClient();

  interface DeleteData {
    role?: string;
  }

  const { mutate, } = useMutation<IReview[], AxiosError, DeleteData>(
    async (deleteData: DeleteData) => {
      const url = deleteData.role === 'admin'
        ? `/admin/reviews/${reviewId}`
        : `/reviews/${reviewId}`;

      const { data, } = await kallInstance.delete<IReview[]>(url);

      return data;
    },
    {
      onSuccess: async () => {
        qc.refetchQueries([ 'getReviewById', reviewId, ]);
      },
    }
  );

  return { mutate, };
};
