import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { ICodeTable } from '@/types/tables.types';
import { axiosInstance } from '@/data/axios.data';

export const getCodeTable = async () => {
  const { data, } = await axiosInstance.get<ICodeTable>('/codeTable.json');

  return data;
};

export const useCodeTable = () => {
  const fallback = {};
  const { data = fallback, } = useQuery<ICodeTable, AxiosError>(
    [ 'getCodeTable', ],
    getCodeTable,
    {
      staleTime: Infinity,
    }
  );

  return data as ICodeTable;
};
