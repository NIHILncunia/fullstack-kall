import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { kallInstance } from '@/data/axios.data';
import { IQueryOptions } from '@/types/other.types';
import { IQuestion } from '@/types/tables.types';

export const getQuestions = async () => {
  const { data, } = await kallInstance.get<IQuestion[]>('/admin/questions');

  return data;
};

export const getQuestionById = async (id: number) => {
  const { data, } = await kallInstance.get<IQuestion>(`/questions/${id}`);

  return data;
};

export const getQuestionByProductId = async (productId: number) => {
  const { data, } = await kallInstance.get<IQuestion[]>(
    `/questions/product/${productId}`
  );

  return data;
};

export const getQuestionByUserId = async (userId: string) => {
  const { data, } = await kallInstance.get<IQuestion[]>(
    `/questions/user/${userId}`
  );

  return data;
};

export const useQuestions = () => {
  const { data = [], } = useQuery<IQuestion[], AxiosError>(
    [ 'getQuestions', ],
    getQuestions
  );

  return data as IQuestion[];
};

export const useQuestionById = (id: number, options?: IQueryOptions) => {
  const { data = {}, } = useQuery<IQuestion, AxiosError>(
    [ 'getQuestionById', id, ],
    () => getQuestionById(id),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IQuestion;
};

export const useQuestionByProductId = (productId: number, options?: IQueryOptions) => {
  const { data = [], } = useQuery(
    [ 'getQuestionByProductId', productId, ],
    () => getQuestionByProductId(productId),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IQuestion[];
};

export const useQuestionByUserId = (userId: string, options?: IQueryOptions) => {
  const { data = [], } = useQuery(
    [ 'getQuestionByUserId', userId, ],
    () => getQuestionByUserId(userId),
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
  }

  const { mutate, } = useMutation<void, AxiosError, Update>(
    async (updateData) => {
      const { data: uData, id, } = updateData;
      const { data, } = await kallInstance.put(`/questions/${id}`, uData);

      return data;
    },
    {}
  );

  return { mutate, };
};

export const useDeleteQuestion = () => {
  const { mutate, } = useMutation(
    async (questionId: number) => {
      const { data, } = await kallInstance.delete(`/questions${questionId}`);

      return data;
    },
    {}
  );

  return { mutate, };
};
