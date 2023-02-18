import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import tw from 'twin.macro';
import { AppLayout } from '@/layouts';
import { SlideBlock } from '@/components/Content/Home';
import { Heading2 } from '@/components/Content';
import { getProductsHome } from '@/data/queries';
import { IProduct } from '@/types/tables.typea';
import { ProductList } from '@/components/Content/ProductItem';

export function Home() {
  const {
    isLoading, isError, isSuccess, error, data,
  } = useQuery<IProduct[], AxiosError>(
    [ 'getProduts', ],
    getProductsHome,
    {
      staleTime: 20000,
    }
  );

  return (
    <>
      <AppLayout title='홈페이지' url='/'>
        <div id='home-page'>
          <SlideBlock />
          <Heading2>새로운 상품</Heading2>

          {isLoading && (
            <div css={tw` text-[2rem] text-center my-[200px] `}>
              데이터를 불러오는 중...
            </div>
          )}

          {isError && (
            <div css={tw` text-[2rem] text-center text-red-500 my-[200px] `}>
              <p>데이터를 불러오는 도중 에러가 발생했습니다.</p>
              <p>{error.message}</p>
            </div>
          )}

          {isSuccess && (
            <ProductList data={data} />
          )}
        </div>
      </AppLayout>
    </>
  );
}
