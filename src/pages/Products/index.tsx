import React from 'react';
import { AppLayout } from '@/layouts';
import { Heading2, TagsProducts } from '@/components/Content';
import { productsPageStyle } from './style';
import { useProductByCategoryId } from '@/hooks/trueQuery/product';
import { useCategoryById } from '@/hooks/trueQuery/category';

interface IProductsProps {
  category: string;
}

export function Products({ category, }: IProductsProps) {
  const data = useProductByCategoryId(category);
  const categoryName = useCategoryById(category).category_name;

  return (
    <>
      <AppLayout title={categoryName}>
        <div id='custom-cake-page' css={productsPageStyle}>
          <Heading2>{categoryName}</Heading2>
          <TagsProducts data={data} />
        </div>
      </AppLayout>
    </>
  );
}
