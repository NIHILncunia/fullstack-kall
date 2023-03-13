import React, { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
import { AppLayout } from '@/layouts';
import { ItemRate } from '@/components/Content';
import {
  articleBottomStyle, articleContentStyle, articleOrderListStyle, articleRateStyle, articleTargetItemStyle, articleTopStyle, goToBackStyle, reviewArticlePageStyle
} from './style';
import { ReviewOrderDetailItem } from '@/components/Content/Community';
import { CommentForm, ReviewCommentList } from '@/components/Content/Admin';
import { useDeleteReview, useReviewById, useReviews } from '@/hooks/trueQuery/review';
import { useUserById } from '@/hooks/trueQuery/users';
import { useProductById } from '@/hooks/trueQuery/product';
import { useOrderById } from '@/hooks/trueQuery/order';
import { useOrderDetailByOrderId } from '@/hooks/trueQuery/orderDetail';
import { useReviewCommentByReviewId } from '@/hooks/trueQuery/reviewComment';

export function ReviewArticle() {
  const [ cookies, ] = useCookies([ 'id', 'role', ]);
  const params = useParams();
  const review = useReviewById(Number(params.id));
  const reviews = useReviews(cookies.role as string);
  const userData = useUserById(review.userDTO.userId, {
    enabled: 'reviewId' in review,
  });
  const product = useProductById(review.productDTO.productId, {
    enabled: 'reviewId' in review,
  });
  const order = useOrderById(review.orderDetailDTO.orderDNb, {
    enabled: 'reviewId' in review,
  });
  const orderDetail = useOrderDetailByOrderId(order.orderId, {
    enabled: 'reviewId' in order,
  });
  const reviewComments = useReviewCommentByReviewId(review.reviewId, {
    enabled: 'reviewId' in review,
  });

  const deleteReview = useDeleteReview(review.reviewId);

  const navi = useNavigate();

  const onClickEdit = useCallback(() => {
    navi(
      cookies.role === 'admin'
        ? `/admin/review/${review.reviewId}/edit`
        : `/mypage/review/${review.reviewId}/edit`
    );
  }, [ cookies, review, ]);

  const onClickDelete = useCallback(() => {
    if (cookies.role === 'admin') {
      deleteReview.mutate({ role: cookies.role, });
      console.log(`[DELETE /admin/reviews/${review.reviewId}]`);
    } else {
      deleteReview.mutate({});
      console.log(`[DELETE /reviews/${review.reviewId}]`);
    }
  }, [ review, cookies, ]);

  const currentIndex = useMemo(() => {
    return reviews.findIndex((item) => item.reviewId === Number(params.id));
  }, [ reviews, params, ]);

  const prevItem = reviews[currentIndex - 1];
  const nextItem = reviews[currentIndex + 1];

  return (
    <>
      <AppLayout title={review.title}>
        <div id='community-review-article-page' css={reviewArticlePageStyle}>
          <div className='go-to-back' css={goToBackStyle}>
            {
              cookies.role === 'admin'
                ? (
                  <>
                    <Link to='/admin/review'>목록으로</Link>
                    <button onClick={onClickEdit}>수정</button>
                    <button onClick={onClickDelete}>삭제</button>
                  </>
                )
                : cookies.id === userData.userId
                  ? (
                    <>
                      <Link to='/community/review'>목록으로</Link>
                      <button onClick={onClickEdit}>수정</button>
                      <button onClick={onClickDelete}>삭제</button>
                    </>
                  )
                  : <Link to='/community/review'>목록으로</Link>
            }
          </div>
          <div className='border border-solid border-black-200 divide-y divide-solid divide-black-200 mb-[30px]'>
            <div className='article-top' css={articleTopStyle}>
              <h3>{review.title}</h3>
              <div>
                <p>
                  <span>작성자</span>
                  <span>{userData.name}({userData.userId})</span>
                </p>
                <p>
                  <span>작성일</span>
                  <span>{moment(review.date).format('YYYY-MM-DD HH:mm:ss')}</span>
                </p>
              </div>
            </div>
            <div className='article-content' css={articleContentStyle}>{review.content}</div>
          </div>

          <CommentForm userId={cookies.id} reviewNb={review.reviewId} />

          {reviewComments.length !== 0 && (
            <ReviewCommentList comments={reviewComments} />
          )}

          <div className='article-rate' css={articleRateStyle}>
            <h4>평점</h4>
            <ItemRate rate={review.star} />
          </div>
          <div className='article-target-item' css={articleTargetItemStyle}>
            <p>{userData.name}님께서 구매하신 상품입니다.</p>
            <div>
              <img src={product.image} alt={product.name} />
              <div>
                <h4>
                  <Link to={`/products/${product.categoryDTO}/${product.productId}`}>
                    {product.name}
                  </Link>
                </h4>
                <p>{product.price?.toLocaleString()}원</p>
                <ItemRate rate={product.star} />
              </div>
            </div>
          </div>

          {orderDetail.length !== 0 && (
            <div className='article-order-list' css={articleOrderListStyle}>
              <p>이 상품과 함께 구매하신 상품 목록입니다.</p>
              {orderDetail.map((item) => (
                <ReviewOrderDetailItem key={item.orderDNb} item={item} />
              ))}
            </div>
          )}

          <div className='article-bottom' css={articleBottomStyle}>
            <div className='prev-link'>
              {prevItem && (
                <Link to={`/community/review/${prevItem.reviewId}`}>
                  <FaArrowLeft />
                  {prevItem.title}
                </Link>
              )}
            </div>
            <div className='next-link'>
              {nextItem && (
                <Link to={`/community/review/${nextItem.reviewId}`}>
                  {nextItem.title}
                  <FaArrowRight />
                </Link>
              )}
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
