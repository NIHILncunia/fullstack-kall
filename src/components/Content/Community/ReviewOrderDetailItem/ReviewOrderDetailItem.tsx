import React from 'react';
import { IOrderDetail } from '@/types/tables.types';
import { getItemString } from '@/utils';
import { itemStyle } from './style';
import { useProductById } from '@/hooks/trueQuery/product';
import { useCategoryById } from '@/hooks/trueQuery/category';

interface IReviewOrderDetailItemProps {
  item: IOrderDetail;
}

export function ReviewOrderDetailItem({ item, }: IReviewOrderDetailItemProps) {
  const product = useProductById(item.product_id);
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
