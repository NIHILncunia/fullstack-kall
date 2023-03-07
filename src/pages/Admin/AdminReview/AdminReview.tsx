import React, { useState } from 'react';
import { AdminLayout, AppLayout } from '@/layouts';
import { Heading2 } from '@/components/Content';
import { useReviews } from '@/hooks/trueQuery/review';
import { ReviewItem } from '@/components/Content/Admin';
import { listHeaderStyle, reviewListStyle } from './style';

export function AdminReview() {
  const reviews = useReviews();
  const [ items, setItems, ] = useState<number[]>([]);

  return (
    <>
      <AppLayout title='리뷰 관리'>
        <AdminLayout pageId='admin-review-page'>
          <Heading2>리뷰 관리</Heading2>
          <div css={reviewListStyle}>
            <div className='list-header' css={listHeaderStyle}>
              <div>선택</div>
              <div>제목</div>
              <div>작성자</div>
              <div>평점</div>
            </div>
            {reviews.map((item) => (
              <ReviewItem key={item.id} item={item} items={items} setItems={setItems} />
            ))}
          </div>
        </AdminLayout>
      </AppLayout>
    </>
  );
}
