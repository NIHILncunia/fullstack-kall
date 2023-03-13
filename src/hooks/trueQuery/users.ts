import { AxiosError } from 'axios';
import {
  useMutation, useQuery, useQueryClient
} from 'react-query';
import { useState } from 'react';
import { kallInstance } from '@/data/axios.data';
import { IUser, IUserDel } from '@/types/tables.types';
import { IQueryOptions, IUsersDeleteResponse } from '@/types/other.types';

const getUsers = async () => {
  const { data, } = await kallInstance.get<IUser[]>('/users');

  return data;
};

export const getUserById = async (id: string) => {
  const { data, } = await kallInstance.get<IUser>(`/users/${id}`);

  return data;
};

export const getAuthUserById = async (id: string) => {
  const token: string = JSON.parse(localStorage.getItem('token'));

  const { data, } = await kallInstance.get<IUser>(`/users/auth/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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
export const useUserById = (id: string, options?: IQueryOptions) => {
  const fallback = {};
  const { data = fallback, } = useQuery<IUser, AxiosError>(
    [ 'getUserById', id, ],
    () => getUserById(id),
    {
      enabled: options?.enabled ?? true,
    }

  );

  return data as IUser;
};

export const useAuthUserById = (id: string, options?: IQueryOptions) => {
  const fallback = {};
  const { data = fallback, } = useQuery<IUser, AxiosError>(
    [ 'getAuthUserById', id, ],
    () => getAuthUserById(id),
    {
      enabled: options?.enabled ?? true,
    }

  );

  return data as IUser;
};

// ==================== 회원 탈퇴 ====================
export const useDeleteUser = (id: string) => {
  const [ message, setMessage, ] = useState('');

  const queryClient = useQueryClient();

  const { mutate, } = useMutation<string, AxiosError, IUserDel>(
    async (userDelData) => {
      const { data, } = await kallInstance.delete<string>(
        `/users/${id}`,
        {
          data: userDelData,
        }
      );

      return data;
    },
    {
      onSuccess: async (data) => {
        const usersData = await getUsers();

        queryClient.setQueryData(
          [ 'getUsers', ],
          usersData
        );

        setMessage(data);
      },
    }
  );

  return { mutate, message, };
};

// ==================== 개별 데이터 업데이트하기 (어드민) ====================
export const useUpdateUser = (id: string) => {
  const [ message, setMessage, ] = useState('');

  const queryClient = useQueryClient();

  const { mutate, } = useMutation<string, AxiosError, IUser>(
    async (newData) => {
      const { data, } = await kallInstance.put<string>(
        `/admin/users/${id}`,
        newData
      );

      return data;
    },
    {
      onSuccess: async (data) => {
        const userData = await getUserById(id);
        console.log(data);

        queryClient.setQueryData(
          [ 'getUserById', id, ],
          userData
        );

        setMessage(data);
      },
    }
  );

  return { mutate, message, };
};

// ==================== 다수 데이터 삭제하기 (어드민) ====================
export const useDeleteUsers = () => {
  const queryClient = useQueryClient();

  type UserDelData = {
    idArray: string[];
    text: string;
  };

  const { mutate, } = useMutation<IUsersDeleteResponse, AxiosError, UserDelData>(
    async (userDelData: UserDelData) => {
      const { data, } = await kallInstance.delete<IUsersDeleteResponse>(
        '/admin/users',
        {
          data: userDelData,
        }
      );
      return data;
    },
    {
      onSuccess: async () => {
        const usersData = await getUsers();

        queryClient.setQueryData(
          [ 'getUsers', ],
          usersData
        );
      },
    }
  );

  return { mutate, };
};
