import React, { useMemo } from 'react';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import { IReview } from '@/types/tables.types';
import { ItemRate } from '../../ItemRate';
import { reviewItem } from './style';
import { useProducts } from '@/hooks/trueQuery/product';

interface IReviewItemProps {
  item: IReview;
}

export function ReviewItem({ item, }: IReviewItemProps) {
  const products = useProducts();

  const [ product, ] = useMemo(() => {
    return products.filter((product) => product.productId === item.productDTO);
  }, [ products, item, ]);

  return (
    <>
      <div css={reviewItem}>
        <img src={product?.image} alt={product?.name} />
        <div className='item-info'>
          <div>
            <h3>
              <Link to={`/community/review/${item.reviewId}`}>{item.title}</Link>
            </h3>
            <p>{item.content}</p>
          </div>
          <ItemRate rate={item.star} styles={tw`text-[2rem] w-full justify-end`} />
        </div>
      </div>
    </>
  );
}
