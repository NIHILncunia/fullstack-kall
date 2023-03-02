import { AxiosError } from 'axios';
import {
  useMutation, useQuery, useQueryClient
} from 'react-query';
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
  const queryClient = useQueryClient();

  const { mutate, } = useMutation(
    async (newData: IUser) => {
      const { data, } = await kallInstance.put<IUser>(
        `/admin/users/${id}`,
        newData
      );

      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ 'getUserById', id, ]);
        getUserById(id);
      },
    }
  );

  return mutate;
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
        getUsers();
      },
    }
  );

  return mutate;
};
