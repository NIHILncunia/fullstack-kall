import React, { useMemo } from 'react';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import { IReview } from '@/types/tables.types';
import { useProducts } from '@/hooks/queries/product';
import { ItemRate } from '../../ItemRate';
import { reviewItem } from './style';

interface IReviewItemProps {
  item: IReview;
}

export function ReviewItem({ item, }: IReviewItemProps) {
  const products = useProducts();

  const [ product, ] = useMemo(() => {
    return products.filter((product) => product.id === item.product_id);
  }, [ products, item, ]);

  return (
    <>
      <div css={reviewItem}>
        <img src={product?.image} alt={product?.name} />
        <div className='item-info'>
          <div>
            <h3>
              <Link to={`/community/review/${item.id}`}>{item.title}</Link>
            </h3>
            <p>{item.content}</p>
          </div>
          <ItemRate rate={item.star} styles={tw`text-[2rem] w-full justify-end`} />
        </div>
      </div>
    </>
  );
}
