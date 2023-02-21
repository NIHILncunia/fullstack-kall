import React from 'react';
import { IReview } from '@/types/tables.types';

interface IReviewItemProps {
  data: IReview[];
}

export function ReviewItem({ data, }: IReviewItemProps) {
  return (
    <>
      <div>content</div>
    </>
  );
}
