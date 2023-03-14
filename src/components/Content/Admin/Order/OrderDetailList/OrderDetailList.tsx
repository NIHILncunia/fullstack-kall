import React from 'react';
import tw from 'twin.macro';
import { IOrderDetail } from '@/types/tables.types';
import { getItemString } from '@/utils';
import { ItemRate } from '@/components/Content/ItemRate';
import { orderDetailListStyle } from './style';
import { useProductById } from '@/hooks/trueQuery/product';
import { useCategoryById } from '@/hooks/trueQuery/category';

interface IOrderDetaillistProps {
  item: IOrderDetail;
}

export function OrderDetailList({ item, }: IOrderDetaillistProps) {
  const product = useProductById(item.productDTO?.productId);
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
      <div css={orderDetailListStyle}>
        <img src={product.image} alt={product.name} />
        <div>
          <div>{itemString}</div>
          <div>{itemTotalPrice}원</div>
          <ItemRate rate={product.star} styles={tw`justify-start`} />
        </div>
      </div>
    </>
  );
}
