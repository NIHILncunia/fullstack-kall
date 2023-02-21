import React, { useCallback } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ISelect } from '@/types/product.select.types';

interface ISelectItemProps {
  id: number;
  item: ISelect;
  items: ISelect[];
  setItems: React.Dispatch<React.SetStateAction<ISelect[]>>;
}

export function SelectItem({
  id, item, items, setItems,
}: ISelectItemProps) {
  const onClickMinus = useCallback(() => {
    const newData = items.map((item) => {
      if (item.id === id) {
        return { ...item, amount: item.amount === 1 ? item.amount : item.amount - 1, };
      } else {
        return item;
      }
    });
    setItems(newData);
  }, [ items, ]);

  const onClickPlus = useCallback(() => {
    const newData = items.map((item) => {
      if (item.id === id) {
        return { ...item, amount: item.amount + 1, };
      } else {
        return item;
      }
    });
    setItems(newData);
  }, [ items, ]);

  const onClickDelete = useCallback(() => {
    const newData = items.filter((item) => item.id !== id);

    setItems(newData);
  }, [ items, ]);

  return (
    <>
      <div>
        <p>{item.item}</p>
        <div>
          <button onClick={onClickMinus}>-</button>
          <input type='number' readOnly value={item.amount} />
          <button onClick={onClickPlus}>+</button>
        </div>
        <p>{(item.price * item.amount).toLocaleString()}원</p>
        <button aria-label='delete-item' onClick={onClickDelete}><FaTimes /></button>
      </div>
    </>
  );
}
