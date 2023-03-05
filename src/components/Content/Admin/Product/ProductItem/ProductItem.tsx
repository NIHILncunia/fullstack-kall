import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { IProduct } from '@/types/tables.types';
import { useCategoryById } from '@/hooks/queries/category';
import { listItemEditStyle } from './style';

interface IProductItemProps {
  item: IProduct;
  selectedItems: number[];
  setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
}

export function ProductItem({ item, selectedItems, setSelectedItems, }: IProductItemProps) {
  const [ isOpen, setIsOpen, ] = useState(false);

  const category = useCategoryById(item.category_id);
  const navi = useNavigate();

  const onClickOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onChangeCheck = useCallback((id: number) => {
    setSelectedItems((prev) => (
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [ ...prev, id, ]
    ));
  }, []);

  const onClickDelete = useCallback((id: number) => {
    console.log(`[DELETE /products/${id}]`);
  }, []);

  return (
    <>
      <div className='list-content'>
        <div>
          <input
            type='checkbox'
            name='item'
            value={item?.id}
            onChange={() => onChangeCheck(item.id)}
            checked={selectedItems.includes(item.id)}
          />
        </div>
        <div>{category.category_name}</div>
        <div onClick={onClickOpen}>{item?.name}</div>
        <div>{item?.amount}</div>
        <div>{item?.price.toLocaleString()}원</div>
      </div>
      {isOpen && (
        <div className='list-item-edit' css={listItemEditStyle}>
          <button onClick={() => navi(`/admin/products/${item.id}/edit`)}>수정</button>
          <button onClick={() => onClickDelete(item.id)}>삭제</button>
        </div>
      )}
    </>
  );
}
