import React, { useCallback } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router';
import { IReview } from '@/types/tables.types';
import { ItemRate } from '@/components/Content';
import { reviewListContent } from './style';

interface IReviewItemProps {
  item: IReview;
}

export function ReviewItem({ item, }: IReviewItemProps) {
  const navi = useNavigate();

  const onClickLink = useCallback(() => {
    navi(`/community/review/${item.reviewId}`);
  }, [ item, ]);

  return (
    <>
      <div className='list-content' css={reviewListContent}>
        <p onClick={onClickLink}>{item.title}</p>
        <p>{item.userDTO.userId}</p>
        <ItemRate rate={item.star} />
        <p>{moment(item.date).format('YYYY-MM-DD HH:mm:ss')}</p>
      </div>
    </>
  );
}
