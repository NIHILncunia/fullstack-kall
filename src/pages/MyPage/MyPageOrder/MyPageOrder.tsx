import React from 'react';
import { useCookies } from 'react-cookie';
import { Heading2 } from '@/components/Content';
import { AppLayout, MyPageLayout } from '@/layouts';
import { useOrderByUserId } from '@/hooks/trueQuery/order';
import { OrderList } from '@/components/Content/Community';
import { orderListStyle } from './style';

export function MyPageOrder() {
  const [ cookies, ] = useCookies([ 'id', ]);
  const myOrder = useOrderByUserId(cookies.id);

  return (
    <>
      <AppLayout title='주문 목록'>
        <MyPageLayout pageId='mypage-order-page'>
          <Heading2>주문 목록</Heading2>

          <div className='order-list' css={orderListStyle}>
            <div className='list-header'>
              <p>주문번호</p>
              <p>주문방법</p>
              <p>주문금액</p>
              <p>주문상태</p>
            </div>
            {myOrder.map((item) => (
              <OrderList key={item.id} item={item} />
            ))}
          </div>
        </MyPageLayout>
      </AppLayout>
    </>
  );
}
