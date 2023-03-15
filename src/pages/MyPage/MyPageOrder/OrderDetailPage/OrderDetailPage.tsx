import React from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { AppLayout, MyPageLayout } from '@/layouts';
import { Heading2, Heading3 } from '@/components/Content';
import { useOrderById } from '@/hooks/trueQuery/order';
import { useOrderDetailByOrderId } from '@/hooks/trueQuery/orderDetail';
import { OrderDetailItem } from './OrderDetailItem';
import { buttonControllsStyle, orderDetailInfoTableStyle, orderDetailItemsStyle } from './style';
import { payString } from '@/data/select.data';

export function OrderDetailPage() {
  const { id, } = useParams<{ id?: string }>();
  console.log('OrderDetailPage >> ', id);
  const order = useOrderById(Number(id));
  const orderDetails = useOrderDetailByOrderId(order.orderId, {
    enabled: order && 'orderId' in order,
  });

  return (
    <>
      <AppLayout title={`주문 상세 정보 (주문번호: ${id})`}>
        <MyPageLayout pageId='mypage-order-detail-page'>
          <Heading2>주문 상세 정보 (주문번호: {id})</Heading2>

          <div className='button-controlls' css={buttonControllsStyle}>
            <Link to='/mypage/order'>목록으로</Link>
          </div>

          <div className='order-detail-table' css={orderDetailInfoTableStyle}>
            <div className='table-header'>주문번호</div>
            <div className='table-content'>{order?.orderId}</div>
            <div className='table-header'>주문자 아이디</div>
            <div className='table-content'>{order?.userDTO?.userId}</div>
            <div className='table-header'>수령자 이름</div>
            <div className='table-content'>{order?.name}</div>
            <div className='table-header'>수령자 연락처</div>
            <div className='table-content'>{order?.phone_nb}</div>
            <div className='table-header'>배송지</div>
            <div className='table-content'>
              [{order?.zip_code}]
              {order?.address_1}
              {order?.address_2}
            </div>
            <div className='table-header'>주문방법</div>
            <div className='table-content'>{payString[order?.payment]}</div>
            <div className='table-header'>사용 마일리지</div>
            <div className='table-content'>{order?.mileage}</div>
            <div className='table-header'>주문 금액</div>
            <div className='table-content'>{order?.price?.toLocaleString()}원</div>
            <div className='table-header'>고객 요청사항</div>
            <div className='table-content'>{order?.request}</div>
            <div className='table-header'>주문상태</div>
            <div className='table-content'>{order?.order_status}</div>
            <div className='table-header'>주문일자</div>
            <div className='table-content'>{moment(order?.date).format('YYYY-MM-DD HH:mm:ss')}</div>
          </div>

          <div className='order-detail-items' css={orderDetailItemsStyle}>
            <Heading3>주문한 상품 목록</Heading3>
            {orderDetails.map((item) => (
              <OrderDetailItem key={item.orderDNb} item={item} />
            ))}
          </div>
        </MyPageLayout>
      </AppLayout>
    </>
  );
}
