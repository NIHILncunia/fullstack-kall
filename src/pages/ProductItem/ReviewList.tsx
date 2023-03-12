import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { IReview } from '@/types/tables.types';
import { reviewList } from './style';

interface IReviewListProps {
  item: IReview;
}

export function ReviewList({ item, }: IReviewListProps) {
  return (
    <>
      <div css={reviewList}>
        <div className='link'>
          <Link to={`/community/review/${item.id}`}>{item.title}</Link>
        </div>
        <div>{item.user_id}</div>
        <div>{moment(item.date).format('YYYY-MM-DD HH:mm:ss')}</div>
      </div>
    </>
  );
}
