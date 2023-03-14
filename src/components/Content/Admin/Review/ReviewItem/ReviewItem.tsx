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
            value={item.reviewId}
            onChange={() => onChnageSelect(item.reviewId)}
            checked={items.includes(item.reviewId)}
          />
        </div>
        <div>
          <Link to={`/admin/review/${item.reviewId}`}>{item.title}</Link>
        </div>
        <div>{item.userDTO?.userId}</div>
        <ItemRate rate={item.star} />
      </div>
    </>
  );
}
