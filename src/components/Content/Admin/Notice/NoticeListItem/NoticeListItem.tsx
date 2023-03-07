import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { INotice } from '@/types/tables.types';
import { useCategoryById } from '@/hooks/trueQuery/category';
import { listContentStyle } from './style';

interface INoticeListItemProps {
  item: INotice;
  items: number[];
  setItems: React.Dispatch<React.SetStateAction<number[]>>;
}

export function NoticeListItem({ item, items, setItems, }: INoticeListItemProps) {
  const category = useCategoryById(item.category_id, {
    enabled: 'id' in item,
  });

  const onChangeItem = useCallback((id: number) => {
    setItems((prev) => (
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [ ...prev, id, ]
    ));
  }, []);

  return (
    <>
      <div className='list-content' css={listContentStyle}>
        <div>
          <input
            type='checkbox'
            name='notice'
            value={item.id}
            onChange={() => onChangeItem(item.id)}
            checked={items.includes(item.id)}
          />
        </div>
        <div>{category.category_name}</div>
        <div>
          <Link to={`/admin/notice/${item.id}`}>{item.title}</Link>
        </div>
        <div>{item.cnt}</div>
      </div>
    </>
  );
}
