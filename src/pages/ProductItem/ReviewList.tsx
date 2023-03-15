import React from 'react';
import { Link } from 'react-router-dom';
import { IReview } from '@/types/tables.types';
import { reviewList } from './style';
import { setDate } from '@/utils/setDate';

interface IReviewListProps {
  item: IReview;
}

export function ReviewList({ item, }: IReviewListProps) {
  return (
    <>
      <div css={reviewList}>
        <div className='link'>
          <Link to={`/community/review/${item.reviewId}`}>{item.title}</Link>
        </div>
        <div>{item.userDTO?.userId}</div>
        <div>{setDate(item.date)}</div>
      </div>
    </>
  );
}
