import React, { useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDeleteWishlist } from '@/hooks/trueQuery/wish';
import { IWish } from '@/types/tables.types';
import { useProductById } from '@/hooks/trueQuery/product';
import { ItemRate } from '@/components/Content';
import { wishlistItem } from './style';

interface IWishlistItemProps {
  item: IWish;
}

export function WishlistItem({ item, }: IWishlistItemProps) {
  const [ { id, }, ] = useCookies([ 'id', ]);
  const product = useProductById(item.product_id, {
    enabled: 'id' in item,
  });

  const deleteWishlist = useDeleteWishlist(id);

  const onClickDeleteWishlistItem = useCallback((id: number) => {
    deleteWishlist.mutate(id);
  }, []);

  return (
    <>
      <div className='wishlist-item' css={wishlistItem}>
        <div className='image'>
          <img src={product.image} alt={product.name} />
          <button
            aria-label='heart'
            onClick={() => onClickDeleteWishlistItem(item.id)}
          >
            <FaHeart />
          </button>
        </div>
        <div>
          <Link to={`/products/${product.category_id}/${product.id}`}>{product.name}</Link>
        </div>
        <div>{product.price?.toLocaleString()}원</div>
        <ItemRate rate={product.star} />
      </div>
    </>
  );
}
