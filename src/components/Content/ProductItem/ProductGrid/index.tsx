import React from 'react';
import { IProduct } from '@/types/tables.types';
import { ProductGridItem } from '../ProductGridItem';
import { itemListStyle } from './style';

interface IProductGridProps {
  data: IProduct[];
}

export function ProductGrid({ data, }: IProductGridProps) {
  return (
    <>
      <div css={itemListStyle}>
        {data.map((item) => (
          <ProductGridItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
