import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { getProductsByCategory } from '@/data/queries';
import { AppLayout } from '@/layouts';
import { IProduct } from '@/types/tables.typea';
import { ErrorList, LoadingList } from '@/components/Content/ProductItem';
import { Heading2, TagsProducts } from '@/components/Content';
import { productsPageStyle } from './style';

interface IProductsProps {
  category: string;
}

export function Products({ category, }: IProductsProps) {
  const {
    isLoading, isError, error, isSuccess, data,
  } = useQuery<IProduct[], AxiosError>(
    [ 'getProducts', category, ],
    () => getProductsByCategory(category),
    {
      staleTime: 20000,
    }
  );

  const categoryObj = {
    custom: '주문제작 케이크',
    design: '디자인 케이크',
    etc: 'ETC',
  };

  return (
    <>
      <AppLayout title={categoryObj[category]}>
        <div id='custom-cake-page' css={productsPageStyle}>
          {isLoading && (
            <LoadingList />
          )}

          {isError && (
            <ErrorList error={error} />
          )}

          {isSuccess && (
            <>
              <Heading2>{categoryObj[category]}</Heading2>
              <TagsProducts data={data} />
            </>
          )}
        </div>
      </AppLayout>
    </>
  );
}
