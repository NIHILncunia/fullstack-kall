import React from 'react';
import tw from 'twin.macro';
import { useCookies } from 'react-cookie';
import { Heading2 } from '@/components/Content';
import { AppLayout, MyPageLayout } from '@/layouts';
import { reviewListHeader } from './style';
import { useReviewByUserId } from '@/hooks/trueQuery/review';
import { ReviewItem } from './ReviewItem';

export function MypageReview() {
  const [ cookies, ] = useCookies([ 'id', ]);
  const myReview = useReviewByUserId(cookies.id);

  return (
    <>
      <AppLayout title='리뷰 목록'>
        <MyPageLayout pageId='mypage-review-page'>
          <Heading2>리뷰 목록</Heading2>

          <div className='review-list' css={tw`flex flex-col gap-[2px]`}>
            <div className='list-header' css={reviewListHeader}>
              <p>제목</p>
              <p>작성자</p>
              <p>평점</p>
              <p>작성일</p>
            </div>
            {myReview.map((item) => (
              <ReviewItem key={item.id} item={item} />
            ))}
          </div>
        </MyPageLayout>
      </AppLayout>
    </>
  );
}
