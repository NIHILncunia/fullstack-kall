import React from 'react';
import { AppLayout } from '@/layouts';
import { Heading2, TagsProducts } from '@/components/Content';
import { productsPageStyle } from './style';
import { useProductsByCategory } from '@/hooks/queries/product';
import { useCategoryById } from '@/hooks/queries/category';

interface IProductsProps {
  category: string;
}

export function Products({ category, }: IProductsProps) {
  const data = useProductsByCategory(category);
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
