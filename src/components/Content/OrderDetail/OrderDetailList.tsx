import React from 'react';
import { IOrderDetail } from '@/types/tables.types';
import { useProductsById } from '@/hooks/queries/product';
import { getItemString } from '@/utils';
import { useCategoryById } from '@/hooks/queries/category';

interface IOrderDetailListProps {
  item: IOrderDetail;
}

export function OrderDetailList({ item, }: IOrderDetailListProps) {
  const product = useProductsById(item.product_id);
  const sheet = useCategoryById(item.option_sheet).category_name;
  const shape = useCategoryById(item.option_shape).category_name;
  const cream = useCategoryById(item.option_cream).category_name;
  const size = useCategoryById(item.option_size).category_name;

  const selection = {
    sheet,
    shape,
    cream,
    size,
  };

  const { itemString, itemTotalPrice, } = getItemString(selection, product, item);

  return (
    <>
      <div className='list-content'>
        <p>{itemString}</p>
        <p>{itemTotalPrice}원</p>
      </div>
    </>
  );
}
