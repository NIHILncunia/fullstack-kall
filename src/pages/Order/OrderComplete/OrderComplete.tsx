import React, { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { AppLayout } from '@/layouts';
import {
  buttonStyle,
  detailListStyle,
  orderCompleteMessageStyle, orderCompletePageStyle, orderInfoStyle, orderProgressStyle
} from './style';
import { Heading2, Heading3 } from '@/components/Content';
import { IOrder, IOrderDetail } from '@/types/tables.types';
import { OrderDetailList } from '@/components/Content/OrderDetail';
import { useUserById } from '@/hooks/trueQuery/users';

export function OrderComplete() {
  const [ orderData, setOrderData, ] = useState<IOrder>(null);
  const [ orderDetails, setOrderDetails, ] = useState<IOrderDetail[]>([]);

  const navigate = useNavigate();

  const [ cookies, ] = useCookies([ 'id', ]);
  const userData = useUserById(cookies.id);

  useEffect(() => {
    const orderDataString = localStorage.getItem('orderData');
    setOrderData(JSON.parse(orderDataString));

    const cartToOrder = localStorage.getItem('cartToOrder');
    setOrderDetails(JSON.parse(cartToOrder));

    return () => {
      // localStorage.removeItem('cartToOrder');
    };
  }, []);

  const onClickGoToHome = useCallback(() => {
    localStorage.removeItem('cartToOrder');
    localStorage.removeItem('orderData');

    navigate('/');
  }, []);

  return (
    <>
      <AppLayout title='주문 완료'>
        <div id='order-complete-page' css={orderCompletePageStyle}>
          <Heading2>주문이 완료되었습니다.</Heading2>
          <div className='order-progress' css={orderProgressStyle}>
            <p>01 장바구니</p>
            <p>02 주문 / 결제</p>
            <p className='selected'>03 주문완료</p>
          </div>
          <div className='order-complete-message' css={orderCompleteMessageStyle}>
            <p>결제가 완료되었습니다.</p>
            <p>주문 정보를 확인해주세요.</p>
          </div>
          <div className='order-info'>
            <Heading3>주문하신 분</Heading3>
            <div className='from-info' css={orderInfoStyle}>
              <div>
                <p>이름</p>
                <p>{userData?.name}</p>
              </div>
              <div>
                <p>연락처</p>
                <p>{userData?.phoneNb}</p>
              </div>
            </div>
            <Heading3>받으시는 분</Heading3>
            <div className='to-info' css={orderInfoStyle}>
              <div>
                <p>이름</p>
                <p>{orderData?.name}</p>
              </div>
              <div>
                <p>연락처</p>
                <p>{orderData?.phone_nb}</p>
              </div>
              <div>
                <p>배송지</p>
                <p>{orderData?.zip_code} {orderData?.address_1} {orderData?.address_2}</p>
              </div>
            </div>
            <Heading3>주문 상세 정보</Heading3>
            <div className='detail-list' css={detailListStyle}>
              <div className='list-header'>
                <p>상품 / 옵션</p>
                <p>상품금액</p>
              </div>
              {orderDetails.map((item) => (
                <OrderDetailList key={item.orderDNb} item={item} />
              ))}
            </div>
            <div className='other-info' css={orderInfoStyle}>
              <div>
                <p>사용 마일리지</p>
                <p>{orderData?.mileage.toLocaleString()}포인트</p>
              </div>
              <div>
                <p>결제 총액</p>
                <p>{orderData?.price.toLocaleString()}원</p>
              </div>
            </div>
          </div>
          <button onClick={onClickGoToHome} css={buttonStyle}>확인</button>
        </div>
      </AppLayout>
    </>
  );
}
