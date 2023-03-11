import React from 'react';
import moment from 'moment';
import { IReview } from '@/types/tables.types';
import { ItemRate } from '@/components/Content';

interface IReviewItemProps {
  item: IReview;
}

export function ReviewItem({ item, }: IReviewItemProps) {
  return (
    <>
      <div className='list-content'>
        <div>{item.title}</div>
        <div>{item.user_id}</div>
        <div>
          <ItemRate rate={item.star} />
        </div>
        <div>{moment(item.date).format('YYYY-MM-DD HH:mm:ss')}</div>
      </div>
    </>
  );
}
