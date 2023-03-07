import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IReview } from '@/types/tables.types';
import { ItemRate } from '@/components/Content/ItemRate';
import { reviewItemStyle } from './style';

interface IReviewItemProps {
  item: IReview;
  items: number[];
  setItems: React.Dispatch<React.SetStateAction<number[]>>;
}

export function ReviewItem({ item, items, setItems, }: IReviewItemProps) {
  const onChnageSelect = useCallback((id: number) => {
    setItems((prev) => (
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [ ...prev, id, ]
    ));
  }, []);

  return (
    <>
      <div className='list-content' css={reviewItemStyle}>
        <div>
          <input
            type='checkbox'
            name='review'
            value={item.id}
            onChange={() => onChnageSelect(item.id)}
            checked={items.includes(item.id)}
          />
        </div>
        <div>
          <Link to={`/admin/review/${item.id}`}>{item.title}</Link>
        </div>
        <div>{item.user_id}</div>
        <ItemRate rate={item.star} />
      </div>
    </>
  );
}
