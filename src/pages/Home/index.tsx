import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { AppLayout } from '@/layouts';
import { SlideBlock } from '@/components/Content/Home';
import { Heading2 } from '@/components/Content';
import { getProductsHome } from '@/data/queries';
import { IProduct } from '@/types/tables.typea';
import { ErrorList, LoadingList, ProductGrid } from '@/components/Content/ProductItem';
import { homePageStyle } from './style';

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
      <AppLayout title='홈페이지'>
        <div id='home-page' css={homePageStyle}>
          <SlideBlock />
          <Heading2>새로운 상품</Heading2>

          {isLoading && (
            <LoadingList />
          )}

          {isError && (
            <ErrorList error={error} />
          )}

          {isSuccess && (
            <ProductGrid data={data} />
          )}
        </div>
      </AppLayout>
    </>
  );
}
