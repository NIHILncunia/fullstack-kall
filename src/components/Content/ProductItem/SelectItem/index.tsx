import React, { useCallback } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ISelect } from '@/types/product.select.types';
import { getItemString } from '@/utils';
import { useProductById } from '@/hooks/trueQuery/product';
import { useCategoryById } from '@/hooks/trueQuery/category';

interface ISelectItemProps {
  id: number;
  item: ISelect;
  items: ISelect[];
  setItems: React.Dispatch<React.SetStateAction<ISelect[]>>;
}

export function SelectItem({
  id, item, items, setItems,
}: ISelectItemProps) {
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

  const onClickMinus = useCallback(() => {
    const newData = items.map((item) => {
      if (item.selectId === id) {
        return { ...item, amount: item.amount === 1 ? item.amount : item.amount - 1, };
      } else {
        return item;
      }
    });
    setItems(newData);
  }, [ items, id, ]);

  const onClickPlus = useCallback(() => {
    const newData = items.map((item) => {
      if (item.selectId === id) {
        return { ...item, amount: item.amount + 1, };
      } else {
        return item;
      }
    });
    setItems(newData);
  }, [ items, id, ]);

  const onClickDelete = useCallback(() => {
    const newData = items.filter((item) => item.selectId !== id);

    setItems(newData);
  }, [ items, id, ]);

  const { itemString, itemTotalPrice, } = getItemString(selection, product, item);

  return (
    <>
      <div>
        <p>{itemString}</p>
        <div>
          <button onClick={onClickMinus}>-</button>
          <input type='number' readOnly value={item.amount} />
          <button onClick={onClickPlus}>+</button>
        </div>
        <p>{itemTotalPrice}원</p>
        <button aria-label='delete-item' onClick={onClickDelete}><FaTimes /></button>
      </div>
    </>
  );
}
