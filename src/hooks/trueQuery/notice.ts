import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { kallInstance } from '@/data/axios.data';
import { INotice } from '@/types/tables.types';
import { IQueryOptions } from '@/types/other.types';

export const getAllNotice = async () => {
  const { data, } = await kallInstance.get<INotice[]>('/notices/all');

  return data;
};

export const getAllNoticeById = async (id: number) => {
  const { data, } = await kallInstance.get<INotice>(`/notices/all/${id}`);

  return data;
};

export const getNotices = async () => {
  const { data, } = await kallInstance.get<INotice[]>('/notices');

  return data;
};

export const getNoticeById = async (id: number) => {
  const { data, } = await kallInstance.get<INotice>(`/notices/${id}`);

  return data;
};

export const getFaqs = async () => {
  const { data, } = await kallInstance.get<INotice[]>('/notices/faqs');

  return data;
};

export const getFaqById = async (id: number) => {
  const { data, } = await kallInstance.get<INotice>(`/notices/faqs/${id}`);

  return data;
};

export const useAllNotice = () => {
  const { data = [], } = useQuery<INotice[], AxiosError>(
    [ 'getAllNotice', ],
    getAllNotice
  );

  return data as INotice[];
};

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

export const useNotices = () => {
  const { data = [], } = useQuery<INotice[], AxiosError>(
    [ 'getNotices', ],
    getNotices
  );

  return data as INotice[];
};

export const useNoticeById = (id: number) => {
  const { data = {}, } = useQuery<INotice, AxiosError>(
    [ 'getNoticeById', id, ],
    () => getNoticeById(id)
  );

  return data as INotice;
};

export const useFaqs = () => {
  const { data = [], } = useQuery<INotice[], AxiosError>(
    [ 'getFaqs', ],
    getFaqs
  );

  return data as INotice[];
};

export const useFaqById = (id: number) => {
  const { data = {}, } = useQuery<INotice, AxiosError>(
    [ 'getFaqById', id, ],
    () => getFaqById(id)
  );

  return data as INotice;
};
