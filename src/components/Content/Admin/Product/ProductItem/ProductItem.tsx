import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { IProduct } from '@/types/tables.types';
import { useCategoryById } from '@/hooks/queries/category';
import { listItemEditStyle } from './style';

interface IProductItemProps {
  item: IProduct;
}

export function ProductItem({ item, }: IProductItemProps) {
  const [ isOpen, setIsOpen, ] = useState(false);
  const category = useCategoryById(item.category_id);
  const navi = useNavigate();

  const onClickOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className='list-content'>
        <div>
          <input type='checkbox' name='item' value={item?.id} />
        </div>
        <div>{category.category_name}</div>
        <div onClick={onClickOpen}>{item?.name}</div>
        <div>{item?.amount}</div>
        <div>{item?.price.toLocaleString()}원</div>
      </div>
      {isOpen && (
        <div className='list-item-edit' css={listItemEditStyle}>
          <button onClick={() => navi(`/admin/products/${item.id}/edit`)}>수정</button>
        </div>
      )}
    </>
  );
}
