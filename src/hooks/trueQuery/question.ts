import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { kallInstance } from '@/data/axios.data';
import { IQueryOptions } from '@/types/other.types';
import { IQuestion } from '@/types/tables.types';

export const getQuestions = async (role?: string) => {
  const url = role === 'admin' ? '/admin' : '';
  const { data, } = await kallInstance.get<IQuestion[]>(`${url}/questions`);

  return data;
};

export const getQuestionById = async (id: number, role?: string) => {
  const url = role === 'admin' ? '/admin' : '';
  const { data, } = await kallInstance.get<IQuestion>(`${url}/questions/${id}`);

  return data;
};

export const getQuestionByProductId = async (productId: number, role?: string) => {
  const url = role === 'admin' ? '/admin' : '';
  const { data, } = await kallInstance.get<IQuestion[]>(
    `${url}/questions/product/${productId}`
  );

  return data;
};

export const getQuestionByUserId = async (userId: string, role?: string) => {
  const url = role === 'admin' ? '/admin' : '';
  const { data, } = await kallInstance.get<IQuestion[]>(
    `${url}/questions/user/${userId}`
  );

  return data;
};

export const useQuestions = (role?: string) => {
  const { data = [], } = useQuery<IQuestion[], AxiosError>(
    [ 'getQuestions', ],
    () => getQuestions(role)
  );

  return data as IQuestion[];
};

export const useQuestionById = (id: number, role?: string, options?: IQueryOptions) => {
  const { data = {}, } = useQuery<IQuestion, AxiosError>(
    [ 'getQuestionById', id, ],
    () => getQuestionById(id, role),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IQuestion;
};

export const useQuestionByProductId = (productId: number, role?: string, options?: IQueryOptions) => {
  const { data = [], } = useQuery(
    [ 'getQuestionByProductId', productId, ],
    () => getQuestionByProductId(productId, role),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IQuestion[];
};

export const useQuestionByUserId = (userId: string, role?: string, options?: IQueryOptions) => {
  const { data = [], } = useQuery(
    [ 'getQuestionByUserId', userId, ],
    () => getQuestionByUserId(userId, role),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IQuestion[];
};

export const useCreateQuestion = () => {
  const { mutate, } = useMutation<IQuestion, AxiosError, IQuestion>(
    async (createQuestion) => {
      const { data, } = await kallInstance.post('/questions', createQuestion);

      return data;
    },
    {}
  );

  return { mutate, };
};

export const useUpdateQuestion = () => {
  interface Update {
    data: IQuestion;
    id: number;
    role?: string;
  }

  const { mutate, } = useMutation<void, AxiosError, Update>(
    async (updateData) => {
      const { data: uData, id, } = updateData;
      const url = updateData.role === 'admin' && '/admin';
      const { data, } = await kallInstance.put(`${url}/questions/${id}`, uData);

      return data;
    },
    {}
  );

  return { mutate, };
};

export const useDeleteQuestion = () => {
  interface Delete {
    questionId: number;
    role?: string;
  }

  const { mutate, } = useMutation<void, AxiosError, Delete>(
    async (deleteData) => {
      const { questionId, role, } = deleteData;

      const url = role === 'admin' ? '/admin' : '';
      const { data, } = await kallInstance.delete(`${url}/questions${questionId}`);

      return data;
    },
    {}
  );

  return { mutate, };
};

export const useDeleteQuestions = () => {
  const { mutate, } = useMutation<void, AxiosError, number[]>(
    async (deleteData) => {
      const { data, } = await kallInstance.delete('/admin/questions', {
        data: deleteData,
      });

      return data;
    },
    {}
  );

  return { mutate, };
};
