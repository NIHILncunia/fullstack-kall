import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { kallInstance } from '@/data/axios.data';
import { IProduct } from '@/types/tables.types';
import { IQueryOptions } from '@/types/other.types';

export const getProducts = async () => {
  const { data, } = await kallInstance.get<IProduct[]>('/products');

  return data;
};

export const getProductById = async (id: number) => {
  const { data, } = await kallInstance.get<IProduct>(`/products/${id}`);

  return data;
};

export const getProductsByCategory = async (categoryId: string) => {
  const { data, } = await kallInstance.get<IProduct[]>(`/products/category?category_id=${categoryId}`);

  return data;
};

// ==================== 모든 데이터 가져오기 ====================
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
