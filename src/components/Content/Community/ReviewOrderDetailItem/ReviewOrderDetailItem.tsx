import React from 'react';
import { IOrderDetail } from '@/types/tables.types';
import { getItemString } from '@/utils';
import { useProductsById } from '@/hooks/queries/product';
import { itemStyle } from './style';
import { useCategoryById } from '@/hooks/queries/category';

interface IReviewOrderDetailItemProps {
  item: IOrderDetail;
}

export function ReviewOrderDetailItem({ item, }: IReviewOrderDetailItemProps) {
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
      <div css={itemStyle}>{itemString} - {itemTotalPrice}</div>
    </>
  );
}
