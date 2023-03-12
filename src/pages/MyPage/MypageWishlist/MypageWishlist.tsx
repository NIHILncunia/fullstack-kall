import React from 'react';
import { useCookies } from 'react-cookie';
import { Heading2 } from '@/components/Content';
import { AppLayout, MyPageLayout } from '@/layouts';
import { useWishlistByUserId } from '@/hooks/trueQuery/wish';
import { WishlistItem } from './WishlistItem';
import { wishlistGrid } from './style';

export function MypageWishlist() {
  const [ { id, }, ] = useCookies([ 'id', ]);
  const wishlists = useWishlistByUserId(id);

  return (
    <>
      <AppLayout title='찜목록'>
        <MyPageLayout pageId='mypage-wishlist-page'>
          <Heading2>찜목록</Heading2>

          <div className='wishlist' css={wishlistGrid}>
            {wishlists.map((item) => (
              <WishlistItem key={item.id} item={item} />
            ))}
          </div>
        </MyPageLayout>
      </AppLayout>
    </>
  );
}
