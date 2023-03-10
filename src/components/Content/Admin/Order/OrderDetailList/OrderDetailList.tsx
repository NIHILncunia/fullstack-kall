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
