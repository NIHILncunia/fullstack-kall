import React from 'react';
import { IProduct } from '@/types/tables.types';
import { ProductGridItem } from '../ProductGridItem';
import { itemListStyle } from './style';

interface IProductGridProps {
  data: IProduct[];
}

export function ProductGrid({ data, }: IProductGridProps) {
  console.log(data);
  return (
    <>
      <div css={itemListStyle}>
        {data.map((item) => (
          <ProductGridItem key={item.productId} item={item} />
        ))}
      </div>
    </>
  );
}
