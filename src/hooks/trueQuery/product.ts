import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { useMemo } from 'react';
import { kallInstance } from '@/data/axios.data';
import { IProduct } from '@/types/tables.types';
import { IQueryOptions } from '@/types/other.types';
import { randomArray } from '@/utils';

export const getProducts = async () => {
  const { data, } = await kallInstance.get<IProduct[]>('/products');

  return data;
};

export const getProductById = async (id: number) => {
  const { data, } = await kallInstance.get<IProduct>(`/products/${id}`);

  return data;
};

export const getProductByCategoryId = async (categoryId: string) => {
  const { data, } = await kallInstance.get<IProduct[]>(`/products/category?category_id=${categoryId}`);

  return data;
};

// ==================== 모든 데이터 가져오기 ====================
export const useProducts = () => {
  const { data = [], } = useQuery<IProduct[], AxiosError>(
    [ 'getProducts', ],
    getProducts
  );

  return data as IProduct[];
};

// ==================== 최신 6개 데이터 가져오기 ====================
export const useHomeProduct = () => {
  const { data = [], } = useQuery<IProduct[], AxiosError>(
    [ 'getHomeProduct', ],
    async () => {
      const { data, } = await kallInstance.get<IProduct[]>('/products');

      return data
        .sort((a, b) => {
          const beforeDate = new Date(a.date).getTime();
          const afterDate = new Date(b.date).getTime();

          return afterDate - beforeDate;
        })
        .slice(0, 6);
    },
    {}
  );

  return data as IProduct[];
};

// ==================== 개별 데이터 가져오기 ====================
export const useProductById = (id: number, options?: IQueryOptions) => {
  const { data = {}, } = useQuery<IProduct, AxiosError>(
    [ 'getProductById', id, ],
    () => getProductById(id),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IProduct;
};

// ==================== 카테고리별 추천 상품 가져오기 ====================
export const useRecentProducts = (categoryId: string, id: number, options?: IQueryOptions) => {
  const { data = [], } = useQuery<IProduct[], AxiosError>(
    [ 'getRecentProducts', id, ],
    () => getProductByCategoryId(categoryId),
    {
      enabled: options?.enabled ?? true,
      cacheTime: 0,
      keepPreviousData: true,
    }
  );

  const array = useMemo(() => {
    return randomArray(data).slice(0, 5);
  }, [ data, ]);

  return array as IProduct[];
};

// ==================== 카테고리별 데이터 가져오기 ====================
export const useProductByCategoryId = (categoryId: string, options?: IQueryOptions) => {
  const { data = [], } = useQuery<IProduct[], AxiosError>(
    [ 'getProductByCategoryId', categoryId, ],
    () => getProductByCategoryId(categoryId),
    {
      enabled: options?.enabled ?? true,
    }
  );

  return data as IProduct[];
};

// ==================== 데이터 추가하기 ====================
interface ICreateProduct {
  productData: IProduct;
  formData: FormData;
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const { mutate, } = useMutation<string, AxiosError, ICreateProduct>(
    async (createData) => {
      const { data, } = await kallInstance.post<string>(
        '/products',
        createData.formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data;boundary="boundary"',
          },
          data: {
            ...createData.productData,
          },
        }
      );

      return data;
    },
    {
      onSuccess: async (data) => {
        const productData = await getProducts();
        queryClient.setQueryData(
          [ 'getProducts', ],
          productData
        );

        console.log(data);
      },
    }
  );

  return { mutate, };
};

// ==================== 데이터 수정하기 - 기본 정보 ====================
// ==================== 데이터 수정하기 - 대표 이미지 ====================
// ==================== 데이터 수정하기 - 상세 이미지들 ====================
// ==================== 데이터 삭제하기 ====================
// ==================== 데이터 여러개 삭제하기 ====================
