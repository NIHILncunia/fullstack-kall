import React from 'react';
import { AppLayout } from '@/layouts';
import { Heading2, IsLoding, TagsProducts } from '@/components/Content';
import { productsPageStyle } from './style';
import { useProductsByCategory } from '@/hooks/queries/product';

interface IProductsProps {
  category: string;
}

export function Products({ category, }: IProductsProps) {
  const data = useProductsByCategory(category);

  const categoryObj = {
    custom: '주문제작 케이크',
    design: '디자인 케이크',
    etc: 'ETC',
  };

  return (
    <>
      <AppLayout title={categoryObj[category]}>
        <div id='custom-cake-page' css={productsPageStyle}>
          <IsLoding />
          <Heading2>{categoryObj[category]}</Heading2>
          <TagsProducts data={data} />
        </div>
      </AppLayout>
    </>
  );
}
