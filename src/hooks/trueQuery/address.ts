import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { kallInstance } from '@/data/axios.data';
import { IAddress } from '@/types/tables.types';

export const getAddressByUser = async (userId: string) => {
  try {
    const { data, } = await kallInstance.get<IAddress[]>(`/addresses/user?user_id=${userId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// ==================== 유저 주소 가져오기 ====================
export const useAddressesByUser = (userId: string) => {
  const { data = [], } = useQuery<IAddress[], AxiosError>(
    [ 'getAddressByUser', userId, ],
    () => getAddressByUser(userId)
  );

  return data as IAddress[];
};

// ==================== 새 주소 추가 ====================
export const useCreateAddress = (userId: string) => {
  const queryClient = useQueryClient();

  const { mutate, } = useMutation<IAddress, AxiosError, IAddress>(
    async (newAddress: IAddress) => {
      const { data, } = await kallInstance.post<IAddress>(
        '/addresses',
        newAddress
      );

      return data;
    },
    {
      onSuccess(data) {
        queryClient.invalidateQueries([ 'getAddressByUser', userId, ]);
        console.log('반환값 >> ', data);
      },
    }
  );

  return { mutate, };
};

// ==================== 기본 배송지 변경 ====================
export const useUpdateDefaultAddress = (userId: string) => {
  const queryClient = useQueryClient();

  const { mutate, } = useMutation<IAddress, AxiosError, IAddress>(
    async (addressData) => {
      const { data, } = await kallInstance.put<IAddress>(
        `/addresses/${addressData.id}/default`,
        addressData
      );

      return data;
    },
    {
      onSuccess: async (data) => {
        const addressData = await getAddressByUser(userId);
        queryClient.setQueryData([ 'getAddressByUser', userId, ], addressData);
        console.log('useUpdateDefaultAddress >> ', data);
      },
    }
  );

  return {
    mutate,
  };
};
