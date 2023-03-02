import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { axiosInstance } from '@/data/axios.data';
import { IAddress } from '@/types/tables.types';

export const useAddressesByUser = (userId: string) => {
  const fallback = [];
  const { data = fallback, } = useQuery<IAddress[], AxiosError>(
    [ 'getAddressesByUser', userId, ],
    async () => {
      const { data, } = await axiosInstance.get<IAddress[]>('/address.json');
      const userAddressData = data.filter((item) => item.user_id === userId);

      return userAddressData;
    }

  );

  return data as IAddress[];
};
