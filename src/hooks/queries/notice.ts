import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { INotice } from '@/types/tables.types';
import { axiosInstance } from '@/data/axios.data';

export const useNotices = () => {
  const fallback = [];
  const { data = fallback, } = useQuery<INotice[], AxiosError>(
    [ 'getNotices', ],
    async () => {
      const { data, } = await axiosInstance.get<INotice[]>('/notice.json');

      return data;
    },
    {
      staleTime: 30000,
      refetchInterval: 60000,
    }
  );

  return data as INotice[];
};

export const useNoticeByCategory = (categoryId: string) => {
  const fallback = [];
  const { data = fallback, } = useQuery<INotice[], AxiosError>(
    [ 'getNoticeByCategory', categoryId, ],
    async () => {
      const { data, } = await axiosInstance.get<INotice[]>('/notice.json');

      return data.filter((item) => item.category_id === categoryId);
    },
    {
      staleTime: 30000,
      refetchInterval: 60000,
    }
  );

  return data as INotice[];
};

export const useNoticeById = (id: number) => {
  const fallback = [];
  const { data = fallback, } = useQuery<INotice, AxiosError>(
    [ 'getNotice', id, ],
    async () => {
      const { data, } = await axiosInstance.get<INotice[]>('/notice.json');
      const [ notice, ] = data.filter((item) => item.id === id);

      return notice;
    },
    {
      staleTime: 30000,
      refetchInterval: 60000,
    }
  );

  return data as INotice;
};
