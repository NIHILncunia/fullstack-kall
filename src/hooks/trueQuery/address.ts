import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { kallInstance } from '@/data/axios.data';
import { IAddress } from '@/types/tables.types';

export const getAddressByUser = async (userId: string) => {
  try {
    const { data, } = await kallInstance.get<IAddress[]>(`/addresses/user/${userId}`);
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

  const { mutate, } = useMutation<string, AxiosError, IAddress>(
    async (newAddress: IAddress) => {
      const { data, } = await kallInstance.post<string>(
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

// ==================== 개별 주소 수정 ====================
export const useUpdateAddress = (id: number, userId: string) => {
  const queryClient = useQueryClient();

  const { mutate, } = useMutation<string, AxiosError, IAddress>(
    async (updateData: IAddress) => {
      console.log('updateData >> ', updateData);

      const { data, } = await kallInstance.put<string>(
        `/addresses/${id}`,
        updateData
      );

      return data;
    },
    {
      onSuccess: async () => {
        const addressData = await getAddressByUser(userId);

        queryClient.setQueryData(
          [ 'getAddressByUser', userId, ],
          addressData
        );
      },
    }
  );

  return { mutate, };
};

// ==================== 기본 배송지 변경 ====================
export const useUpdateDefaultAddress = (userId: string) => {
  const queryClient = useQueryClient();

  const { mutate, } = useMutation<string, AxiosError, IAddress>(
    async (addressData) => {
      const { data, } = await kallInstance.put<string>(
        `/addresses/${addressData.usAddressId}/default`,
        addressData
      );

      return data;
    },
    {
      onSuccess: async () => {
        const addressData = await getAddressByUser(userId);
        queryClient.setQueryData(
          [ 'getAddressByUser', userId, ],
          addressData
        );
      },
    }
  );

  return {
    mutate,
  };
};

// ==================== 개별 데이터 삭제 ====================
export const useDeleteAddress = (userId: string) => {
  const queryClient = useQueryClient();

  const { mutate, } = useMutation<string, AxiosError, number>(
    async (id) => {
      const { data, } = await kallInstance.delete<string>(
        `/addresses/${id}`
      );

      return data;
    },
    {
      onSuccess: async () => {
        const addressData = await getAddressByUser(userId);
        queryClient.setQueryData(
          [ 'getAddressByUser', userId, ],
          addressData
        );
      },
    }
  );

  return {
    mutate,
  };
};
