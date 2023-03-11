import React, { useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Heading2 } from '@/components/Content';
import { AppLayout, MyPageLayout } from '@/layouts';
import { useOrderByUserId } from '@/hooks/trueQuery/order';
import { DeliveryListItem } from './DeliveryListItem';
import { buttonControlls, deliveryList } from './style';

export function MypageDelivery() {
  const [ status, setStatus, ] = useState('not-complete');
  const [ cookies, ] = useCookies([ 'id', ]);
  const orderData = useOrderByUserId(cookies.id);
  const deliveringData = orderData && orderData?.filter((item) => (
    item.order_status !== '결제대기중' && item.order_status !== '배송완료'
  ));
  const completeData = orderData && orderData?.filter((item) => (
    item.order_status === '배송완료'
  ));

  console.log(deliveringData);
  console.log(completeData);

  const onClickNotComplete = useCallback(() => {
    setStatus('not-complete');
  }, []);

  const onClickComplete = useCallback(() => {
    setStatus('complete');
  }, []);

  return (
    <>
      <AppLayout title='배송 내역'>
        <MyPageLayout pageId='mypage-delivery-page'>
          <Heading2>배송 내역</Heading2>

          <div css={buttonControlls}>
            <button onClick={onClickNotComplete}>배송 준비중 & 배송중</button>
            <button onClick={onClickComplete}>배송 완료</button>
          </div>

          <div className='delivery-list' css={deliveryList}>
            <div className='list-header'>
              <p>주문번호</p>
              <p>상품정보</p>
              <p>상품금액</p>
              <p>주문일자</p>
            </div>
            {status === 'not-complete' && deliveringData.map((item) => (
              <DeliveryListItem key={item.id} item={item} status={status} />
            ))}
            {status === 'complete' && completeData.map((item) => (
              <DeliveryListItem key={item.id} item={item} status={status} />
            ))}
          </div>
        </MyPageLayout>
      </AppLayout>
    </>
  );
}
