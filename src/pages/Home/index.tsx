import React from 'react';
import { AppLayout } from '@/layouts';
import { SlideBlock } from '@/components/Content/Home';
import { Heading2, IsLoding } from '@/components/Content';
import { ProductGrid } from '@/components/Content/ProductItem';
import { homePageStyle } from './style';
import { useProductsHome } from '@/hooks/queries/product';

export function Home() {
  const data = useProductsHome();

  return (
    <>
      <AppLayout title='홈페이지'>
        <div id='home-page' css={homePageStyle}>
          <SlideBlock />
          <Heading2>새로운 상품</Heading2>

          <IsLoding />
          <ProductGrid data={data} />
        </div>
      </AppLayout>
    </>
  );
}
