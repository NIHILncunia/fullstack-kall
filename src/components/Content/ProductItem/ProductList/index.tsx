import React from 'react';
import { IProduct } from '@/types/tables.typea';
import { ProductItem } from '../ProductItem';
import { itemListStyle } from './style';

interface IProductListProps {
  data: IProduct[];
}

export function ProductList({ data, }: IProductListProps) {
  return (
    <>
      <div css={itemListStyle}>
        {data.map((item) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
