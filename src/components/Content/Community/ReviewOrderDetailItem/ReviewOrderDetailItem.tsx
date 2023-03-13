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
  const product = useProductById(item.productDTO.productId);
  const sheet = useCategoryById(item.option_sheet).categoryName;
  const shape = useCategoryById(item.option_shape).categoryName;
  const cream = useCategoryById(item.option_cream).categoryName;
  const size = useCategoryById(item.option_size).categoryName;

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
