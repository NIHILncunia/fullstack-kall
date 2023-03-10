import React from 'react';
import { AppLayout } from '@/layouts';
import { SlideBlock } from '@/components/Content/Home';
import { Heading2 } from '@/components/Content';
import { ProductGrid } from '@/components/Content/ProductItem';
import { homePageStyle } from './style';
import { useHomeProduct } from '@/hooks/trueQuery/product';

export function Home() {
  // const data = useProductsHome();
  const data = useHomeProduct();

  return (
    <>
      <AppLayout title='홈페이지'>
        <div id='home-page' css={homePageStyle}>
          <SlideBlock />
          <Heading2>새로운 상품</Heading2>

          <ProductGrid data={data} />
        </div>
      </AppLayout>
    </>
  );
}
