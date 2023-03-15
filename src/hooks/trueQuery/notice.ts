import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { kallInstance } from '@/data/axios.data';
import { INotice } from '@/types/tables.types';
import { IQueryOptions } from '@/types/other.types';

export const getAllNotice = async () => {
  console.log('공지 전부 가져옴');
  const { data, } = await kallInstance.get<INotice[]>('/notices/all');

  return data;
};

export const getAllNoticeById = async (id: number) => {
  console.log('공지 하나 가져옴');
  const { data, } = await kallInstance.get<INotice>(`/notices/all/${id}`);

  return data;
};

export const getNotices = async () => {
  console.log('Notice 전부 가져옴');
  const { data, } = await kallInstance.get<INotice[]>('/notices');

  return data;
};

export const getNoticeById = async (id: number) => {
  console.log('Notice 하나 가져옴');
  const { data, } = await kallInstance.get<INotice>(`/notices/${id}`);

  return data;
};

export const getFaqs = async () => {
  console.log('FAQ 전부 가져옴');
  const { data, } = await kallInstance.get<INotice[]>('/notices/faqs');

  return data;
};

export const getFaqById = async (id: number) => {
  console.log('FAQ 하나 가져옴');
  const { data, } = await kallInstance.get<INotice>(`/notices/faqs/${id}`);

  return data;
};

// ==================== 카테고리 가리지 않고 모든 공지 가져오기 ====================
export const useAllNotice = () => {
  const { data = [], } = useQuery<INotice[], AxiosError>(
    [ 'getAllNotice', ],
    getAllNotice
  );

  return data as INotice[];
};

// ==================== 카테고리 가리지 않고 하나씩 가져오기 ====================
export const useAllNoticeById = (id: number, options?: IQueryOptions) => {
  const { data = {}, } = useQuery<INotice, AxiosError>(
    [ 'getAllNoticeById', id, ],
    () => getAllNoticeById(id),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as INotice;
};

// ====================  ====================
export const useNotices = () => {
  const { data = [], } = useQuery<INotice[], AxiosError>(
    [ 'getNotices', ],
    getNotices
  );

  return data as INotice[];
};

// ====================  ====================
export const useNoticeById = (id: number) => {
  const { data = {}, } = useQuery<INotice, AxiosError>(
    [ 'getNoticeById', id, ],
    () => getNoticeById(id)
  );

  return data as INotice;
};

// ====================  ====================
export const useFaqs = () => {
  const { data = [], } = useQuery<INotice[], AxiosError>(
    [ 'getFaqs', ],
    getFaqs
  );

  return data as INotice[];
};

// ====================  ====================
export const useFaqById = (id: number) => {
  const { data = {}, } = useQuery<INotice, AxiosError>(
    [ 'getFaqById', id, ],
    () => getFaqById(id)
  );

  return data as INotice;
};

// ====================  ====================
export const useCreateNotice = () => {
  const { mutate, } = useMutation<void, AxiosError, INotice>(
    async (createData) => {
      const { data, } = await kallInstance.post('/admin/notices', createData);

      return data;
    },
    {}
  );

  return { mutate, };
};

// ====================  ====================
export const useUpdateNotice = (noticeId: number) => {
  const { mutate, } = useMutation<void, AxiosError, INotice>(
    async (uData) => {
      const { data, } = await kallInstance.put(`/admin/notices/${noticeId}`, uData);

      return data;
    },
    {}
  );

  return { mutate, };
};

// ====================  ====================
export const useDeleteNotice = (noticeId: number) => {
  const { mutate, } = useMutation<void, AxiosError>(
    async () => {
      const { data, } = await kallInstance.delete(`/admin/notices/${noticeId}`);

      return data;
    },
    {}
  );

  return { mutate, };
};
