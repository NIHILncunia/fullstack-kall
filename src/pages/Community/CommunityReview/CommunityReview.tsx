import React from 'react';
import { AppLayout, CommunityLayout } from '@/layouts';
import { Heading2 } from '@/components/Content';
import { useReviews } from '@/hooks/queries/review';
import { ReviewItem } from '@/components/Content/Community';
import { communityReviewListStyle } from './style';

export function CommunityReview() {
  const reviews = useReviews();

  return (
    <>
      <AppLayout title='커뮤니티 - 리뷰'>
        <CommunityLayout pageId='community-review-page'>
          <Heading2>리뷰</Heading2>
          <div css={communityReviewListStyle}>
            {reviews.map((item) => (
              <ReviewItem key={item.id} item={item} />
            ))}
          </div>
        </CommunityLayout>
      </AppLayout>
    </>
  );
}
