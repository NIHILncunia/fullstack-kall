import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { kallInstance } from '@/data/axios.data';
import { IDirect } from '@/types/tables.types';
import { IQueryOptions } from '@/types/other.types';

export const getDirects = async (role?: string) => {
  const url = role === 'admin'
    ? `/admin/directs`
    : `/directs`;

  const { data, } = await kallInstance.get<IDirect[]>(url);

  return data;
};

export const getDirectById = async (id: number, role?: string) => {
  const url = role === 'admin'
    ? `/admin/directs/${id}`
    : `/directs/${id}`;

  const { data, } = await kallInstance.get<IDirect>(url);

  return data;
};

export const getDirectByCategoryId = async (categoryId: string, role?: string) => {
  const url = role === 'admin'
    ? `/admin/directs/category/${categoryId}`
    : `/directs/category/${categoryId}`;

  const { data, } = await kallInstance.get<IDirect[]>(url);

  return data;
};

export const getDirectByUserId = async (userId: string, role?: string) => {
  const url = role === 'admin'
    ? `/admin/directs/user/${userId}`
    : `/directs/user/${userId}`;

  const { data, } = await kallInstance.get<IDirect[]>(url);

  return data;
};

// ==================== 모든 문의 가져오기 ====================
export const useDirects = (role?: string) => {
  const { data = [], } = useQuery<IDirect[], AxiosError>(
    [ 'getDirects', ],
    () => getDirects(role)
  );

  return data as IDirect[];
};

// ==================== 개별 문의 가져오기 ====================
export const useDirectById = (id: number, role?: string, options?: IQueryOptions) => {
  const { data = {}, } = useQuery<IDirect, AxiosError>(
    [ 'getDirectById', id, ],
    () => getDirectById(id, role),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IDirect;
};

// ==================== 카테고리에 대한 문의 가져오기 ====================
export const useDirectByCategoryId = (categoryId: string, role?: string, options?: IQueryOptions) => {
  const { data = [], } = useQuery<IDirect[], AxiosError>(
    [ 'getDirectByCategoryId', categoryId, ],
    () => getDirectByCategoryId(categoryId, role),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IDirect[];
};

// ==================== 유저에 대한 문의 가져오기 ====================
export const useDirectByUserId = (userId: string, role?: string, options?: IQueryOptions) => {
  const { data = [], } = useQuery<IDirect[], AxiosError>(
    [ 'getDirectByUserId', userId, ],
    () => getDirectByUserId(userId, role),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IDirect[];
};

// ==================== 문의 업데이트 ====================
export const useUpdateDirect = () => {
  interface UpdateData {
    data: IDirect;
    directId: number;
    role?: string;
  }

  const { mutate, } = useMutation<IDirect, AxiosError, UpdateData>(
    async (updateData) => {
      const { data: uData, directId, role, } = updateData;

      const url = role === 'admin'
        ? `/admin/directs/${directId}`
        : `/directs/${directId}`;

      const { data, } = await kallInstance.put(url, uData);

      return data;
    },
    {}
  );

  return { mutate, };
};

// ==================== 문의 삭제 ====================
export const useDeleteDirect = () => {
  interface Delete {
    directId: number;
    role?: string;
  }

  const { mutate, } = useMutation<IDirect[], AxiosError, Delete>(
    async (deleteData) => {
      const { directId, role, } = deleteData;

      const url = role === 'admin'
        ? `/admin/directs/${directId}`
        : `/directs/${directId}`;

      const { data, } = await kallInstance.delete(url);

      return data;
    },
    {}
  );

  return { mutate, };
};

// ==================== 문의 작성 ====================
export const useCreateDirect = () => {
  const { mutate, } = useMutation<IDirect, AxiosError, IDirect>(
    async (createDirect) => {
      const { data, } = await kallInstance.post('/requests', createDirect);

      return data;
    },
    {}
  );

  return { mutate, };
};

// ==================== 여러 문의 삭제 ====================
export const useDeleteDirects = () => {
  const { mutate, } = useMutation(
    async (ids: number[]) => {
      const { data, } = await kallInstance.delete('/admin/directs', {
        data: ids,
      });

      return data;
    },
    {}
  );

  return { mutate, };
};
