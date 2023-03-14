import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IDirect } from '@/types/tables.types';
import { useCategoryById } from '@/hooks/trueQuery/category';
import { directListContentStyle } from './style';

interface IDirectItemProps {
  item: IDirect;
  items: number[];
  setItems: React.Dispatch<React.SetStateAction<number[]>>;
}

export function DirectItem({ item, items, setItems, }: IDirectItemProps) {
  const category = useCategoryById(item.categoryDTO?.categoryId, {
    enabled: !!item,
  });

  const onChangeItem = useCallback((id: number) => {
    setItems((prev) => (prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [ ...prev, id, ]
    ));
  }, []);

  return (
    <>
      <div className='list-content' css={directListContentStyle}>
        <div>
          <input
            type='checkbox'
            name='direct'
            value={item.usQId}
            onChange={() => onChangeItem(item.usQId)}
            checked={items.includes(item.usQId)}
          />
        </div>
        <div>{category.categoryName}</div>
        <div>
          <Link to={`/admin/direct/${item.usQId}`}>{item.title}</Link>
        </div>
        <div>{item.userDTO?.userId}</div>
      </div>
    </>
  );
}
