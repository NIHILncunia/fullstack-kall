import { AxiosError } from 'axios';
import {
  useMutation, useQuery, useQueryClient
} from 'react-query';
import { useState } from 'react';
import { kallInstance } from '@/data/axios.data';
import { IUser } from '@/types/tables.types';

const getUsers = async () => {
  const { data, } = await kallInstance.get<IUser[]>('/users');

  return data;
};

const getUserById = async (id: string) => {
  const { data, } = await kallInstance.get<IUser>(`/users/${id}`);

  return data;
};

// ==================== 전체 데이터 가져오기 ====================
export const useUsers = () => {
  const fallback = [];
  const { data = fallback, } = useQuery<IUser[], AxiosError>(
    [ 'getUsers', ],
    getUsers

  );

  return data as IUser[];
};

// ==================== 개별 데이터 가져오기 ====================
export const useUserById = (id: string) => {
  const fallback = {};
  const { data = fallback, } = useQuery<IUser, AxiosError>(
    [ 'getUserById', id, ],
    () => getUserById(id)

  );

  return data as IUser;
};

// ==================== 개별 데이터 업데이트하기 ====================
export const useUpdateUser = (id: string) => {
  const [ message, setMessage, ] = useState('');

  const queryClient = useQueryClient();

  const { mutate, } = useMutation(
    async (newData: IUser) => {
      const { data, } = await kallInstance.put<string>(
        `/admin/users/${id}`,
        newData
      );

      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([ 'getUserById', id, ]);
        setMessage(data);
      },
    }
  );

  return { mutate, message, };
};

// ==================== 다수 데이터 삭제하기 (어드민) ====================
export const useDeleteUsers = (idArray: string[]) => {
  const queryClient = useQueryClient();

  const { mutate, } = useMutation<string, AxiosError>(
    async () => {
      const { data, } = await kallInstance.delete<string>(
        '/admin/users',
        {
          data: idArray,
        }
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ 'getUsers', ]);
      },
    }
  );

  return mutate;
};
