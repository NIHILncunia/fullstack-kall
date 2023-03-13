import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { ICart } from '@/types/tables.types';
import { getItemString } from '@/utils';
import { useProductById } from '@/hooks/trueQuery/product';
import { useCategoryById } from '@/hooks/trueQuery/category';

interface ICartlistProps {
  item: ICart;
  selectedItems: number[];
  // eslint-disable-next-line no-unused-vars
  onChangeItemSelect: (itemId: number) => void;
}

export function CartList({ item, selectedItems, onChangeItemSelect, }: ICartlistProps) {
  const product = useProductById(item.product_id);
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
      <div className='list-content'>
        <div>
          <label htmlFor={`cart${item.id}`} className='checkbox'>
            <input
              type='checkbox'
              id={`cart${item.id}`}
              name='cart-item'
              value={`${item?.id}-${product.name}`}
              checked={selectedItems.includes(item?.id)}
              onChange={() => onChangeItemSelect(item?.id)}
              hidden
            />
            <div>
              <FaCheck />
            </div>
          </label>
        </div>
        <div>{itemString}</div>
        <div>{itemTotalPrice}원</div>
      </div>
    </>
  );
}
