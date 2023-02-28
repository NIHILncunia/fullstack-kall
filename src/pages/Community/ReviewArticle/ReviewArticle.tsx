import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { AppLayout } from '@/layouts';
import { useReviewById, useReviews } from '@/hooks/queries/review';
import { IsLoding, ItemRate } from '@/components/Content';
import { useUser } from '@/hooks/queries/user';
import {
  articleBottomStyle, articleContentStyle, articleOrderListStyle, articleRateStyle, articleTargetItemStyle, articleTopStyle, goToBackStyle, reviewArticlePageStyle
} from './style';
import { useProductsById } from '@/hooks/queries/product';
import { useOrderById, useOrderDetailByOrderId } from '@/hooks/queries/order';
import { ReviewOrderDetailItem } from '@/components/Content/Community';

export function ReviewArticle() {
  const params = useParams();
  const review = useReviewById(Number(params.id));
  const reviews = useReviews();
  const userData = useUser(review.user_id);
  const product = useProductsById(review.product_id);
  const order = useOrderById(review.order_dnb);
  const orderDetail = useOrderDetailByOrderId(order.id);

  const currentIndex = useMemo(() => {
    return reviews.findIndex((item) => item.id === Number(params.id));
  }, [ reviews, params, ]);

  const prevItem = reviews[currentIndex - 1];
  const nextItem = reviews[currentIndex + 1];

  return (
    <>
      <AppLayout title={review.title}>
        <div id='community-review-article-page' css={reviewArticlePageStyle}>
          <IsLoding />
          <div className='go-to-back' css={goToBackStyle}>
            <Link to='/community/review'>목록으로</Link>
          </div>
          <div className='border border-solid border-black-200 divide-y divide-solid divide-black-200 mb-[30px]'>
            <div className='article-top' css={articleTopStyle}>
              <h3>{review.title}</h3>
              <div>
                <p>
                  <span>작성자</span>
                  <span>{userData.name}({userData.id})</span>
                </p>
                <p>
                  <span>작성일</span>
                  <span>{moment(review.date).format('YYYY-MM-DD HH:mm:ss')}</span>
                </p>
              </div>
            </div>
            <div className='article-content' css={articleContentStyle}>{review.content}</div>
          </div>

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
                  <Link to={`/products/${product.category_id}/${product.id}`}>
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
                <ReviewOrderDetailItem key={item.id} item={item} />
              ))}
            </div>
          )}

          <div className='article-bottom' css={articleBottomStyle}>
            <div className='prev-link'>
              {prevItem && (
                <Link to={`/community/review/${prevItem.id}`}>
                  <FaArrowLeft />
                  {prevItem.title}
                </Link>
              )}
            </div>
            <div className='next-link'>
              {nextItem && (
                <Link to={`/community/review/${nextItem.id}`}>
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
