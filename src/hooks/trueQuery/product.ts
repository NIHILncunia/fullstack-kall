import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { kallInstance } from '@/data/axios.data';
import { IProduct } from '@/types/tables.types';

export const getProducts = async () => {
  const { data, } = await kallInstance.get<IProduct[]>('/products');

  return data;
};

export const getProductById = async (id: number) => {
  const { data, } = await kallInstance.get<IProduct>(`/products/${id}`);

  return data;
};

export const getProductsByCategory = async (categoryId: string) => {
  const { data, } = await kallInstance.get<IProduct[]>(`/products?category_id=${categoryId}`);

  return data;
};

// ==================== 모든 데이터 가져오기 ====================
// ==================== 개별 데이터 가져오기 ====================
// ==================== 카테고리별 데이터 가져오기 ====================
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
        createData
      );

      return data;
    },
    {
      onSuccess: async () => {
        const productData = await getProducts();
        queryClient.setQueryData(
          [ 'getProducts', ],
          productData
        );
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
