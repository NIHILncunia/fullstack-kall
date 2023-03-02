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
      const notice = data.filter((item) => item.category_id === 'notice');

      return notice;
    }

  );

  return data as INotice[];
};

export const useNoticeById = (id: number) => {
  const fallback = {};
  const { data = fallback, } = useQuery<INotice, AxiosError>(
    [ 'getNotice', id, ],
    async () => {
      const { data, } = await axiosInstance.get<INotice[]>('/notice.json');
      const notices = data.filter((item) => item.category_id === 'notice');
      const [ notice, ] = notices.filter((item) => item.id === id);

      return notice;
    }

  );

  return data as INotice;
};

export const useFAQ = () => {
  const fallback = [];
  const { data = fallback, } = useQuery<INotice[], AxiosError>(
    [ 'getFAQ', ],
    async () => {
      const { data, } = await axiosInstance.get<INotice[]>('/notice.json');
      const faq = data.filter((item) => item.category_id !== 'notice');

      return faq;
    }

  );

  return data as INotice[];
};

export const useFAQById = (id: number) => {
  const fallback = {};
  const { data = fallback, } = useQuery<INotice, AxiosError>(
    [ 'getFAQ', id, ],
    async () => {
      const { data, } = await axiosInstance.get<INotice[]>('/notice.json');
      const faqs = data.filter((item) => item.category_id !== 'notice');
      const [ faq, ] = faqs.filter((item) => item.id === id);

      return faq;
    }

  );

  return data as INotice;
};
