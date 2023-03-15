import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { ISelect } from '@/types/product.select.types';
import { useProductById } from '@/hooks/trueQuery/product';
import { getItemString } from '@/utils';
import { useCategoryById } from '@/hooks/trueQuery/category';

interface IEtcSelectItemProps {
  item: ISelect;
  // eslint-disable-next-line no-unused-vars
  onClickDelete: (id: number) => void;
}

export function EtcSelectItem({ item, onClickDelete, }: IEtcSelectItemProps) {
  const product = useProductById(item?.productDTO?.productId);
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
      <div>
        <p>{itemString}</p>
        <p>{itemTotalPrice}원</p>
        <button aria-label='delete-item' onClick={() => onClickDelete(item.selectId)}><FaTimes /></button>
      </div>
    </>
  );
}
