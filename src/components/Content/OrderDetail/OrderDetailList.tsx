import React from 'react';
import { IOrderDetail } from '@/types/tables.types';
import { useProductsById } from '@/hooks/queries/product';
import { useCodeTable } from '@/hooks/queries/code.table';
import { getItemString } from '@/utils';

interface IOrderDetailListProps {
  item: IOrderDetail;
}

export function OrderDetailList({ item, }: IOrderDetailListProps) {
  const product = useProductsById(item.product_id);
  const codeTable = useCodeTable();

  const { itemString, itemTotalPrice, } = getItemString(codeTable, product, item);

  return (
    <>
      <div className='list-content'>
        <p>{itemString}</p>
        <p>{itemTotalPrice}원</p>
      </div>
    </>
  );
}
