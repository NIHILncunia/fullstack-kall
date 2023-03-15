import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import { useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { useQueryClient } from 'react-query';
import { AdminLayout, AppLayout } from '@/layouts';
import { Heading2, Heading3 } from '@/components/Content';
import { useInput } from '@/hooks';
import { IOrder } from '@/types/tables.types';
import { orderDetailListStyle, orderUpdateStyle } from './style';
import { OrderDetailList } from '@/components/Content/Admin';
import {
  useDeleteOrder,
  useOrderById, useOrderDetailByOrderId, useUpdateOrder
} from '@/hooks/trueQuery/order';
import { useUserById } from '@/hooks/trueQuery/users';

export function OrderDetail() {
  const [ status, setStatus, ] = useState('');
  const [ isEdit, setIsEdit, ] = useState(false);
  const [ label, setLabel, ] = useState('수정');

  const params = useParams();
  const order = useOrderById(Number(params.id), 'admin');
  const orderDetail = useOrderDetailByOrderId(Number(params.id));
  const [ { id, role, }, ] = useCookies([ 'id', 'role', ]);
  const user = useUserById(id);
  console.log(order);

  const userIdRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const zipCodeRef = useRef<HTMLInputElement>();
  const address1Ref = useRef<HTMLInputElement>();
  const address2Ref = useRef<HTMLInputElement>();
  const paymentRef = useRef<HTMLInputElement>();
  const mileageRef = useRef<HTMLInputElement>();
  const priceRef = useRef<HTMLInputElement>();
  const requestRef = useRef<HTMLInputElement>();
  const statusRef = useRef<HTMLSelectElement>();

  const userId = useInput(userIdRef, 'user-id');
  const name = useInput(nameRef, 'name');
  const phone = useInput(phoneRef, 'phone');
  const zipCode = useInput(zipCodeRef, 'address');
  const address1 = useInput(address1Ref, 'address');
  const address2 = useInput(address2Ref, 'address');
  const payment = useInput(paymentRef, 'payment');
  const mileage = useInput(mileageRef, 'mileage');
  const price = useInput(priceRef, 'price');
  const request = useInput(requestRef, 'request');

  const qc = useQueryClient();
  const updateOrder = useUpdateOrder(Number(params.id));
  const deleteOrder = useDeleteOrder();

  console.log(params.id);

  const onChangeStatus = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  }, []);

  useEffect(() => {
    if ('orderId' in order) {
      userId.setValue(order?.userDTO?.userId);
      name.setValue(order.name);
      phone.setValue(order.phone_nb);
      zipCode.setValue(order.zip_code);
      address1.setValue(order.address_1);
      address2.setValue(order.address_2);
      payment.setValue(order.payment);
      mileage.setValue(`${order.mileage.toString()}`);
      price.setValue(`${order.price.toString()}`);
      request.setValue(order.request);
    }
  }, [ order, ]);

  const onClickEdit = useCallback(() => {
    if (isEdit) {
      const updateData: IOrder = {
        orderId: Number(params.id),
        userDTO: user,
        name: name.data.value,
        phone_nb: phone.data.value,
        zip_code: zipCode.data.value,
        address_1: address1.data.value,
        address_2: address2.data.value,
        payment: payment.data.value,
        mileage: Number(mileage.data.value),
        price: Number(price.data.value),
        request: request.data.value,
        order_status: status,
      };
      updateOrder.mutate({ data: updateData, role, }, {
        onSuccess: () => {
          qc.refetchQueries([ 'getOrderById', Number(params.id), ]);
        },
      });

      console.log(`[PUT /orders/${params.id}]`, updateData);
      setIsEdit(false);
      setLabel('수정');
    } else {
      setIsEdit(true);
      setLabel('수정완료');
    }
  }, [ isEdit, name, userId, phone, zipCode, address1, address2, payment, mileage, price, request, status, user, ]);

  const onClickDeleteOrder = useCallback((id: number) => {
    deleteOrder.mutate(Number(params.id), {
      onSuccess: () => {
        qc.refetchQueries([ 'getOrderById', Number(params.id), ]);
      },
    });
    console.log(`[DELETE /orders/${id}]`);
  }, [ deleteOrder, params, ]);

  return (
    <>
      <AppLayout title={`주문번호: ${params.id} 상세보기`}>
        <AdminLayout pageId='admin-order-detail-page'>
          <Heading2>주문번호: {params.id} 상세보기</Heading2>

          <div css={orderUpdateStyle}>
            <label htmlFor='user-id'>
              <span>주문자 아이디</span>
              <input
                type='text'
                ref={userIdRef}
                {...userId.data}
                disabled={isEdit === false}
              />
            </label>
            <label htmlFor='name'>
              <span>수령자 이름</span>
              <input
                type='text'
                ref={nameRef}
                {...name.data}
                disabled={isEdit === false}
              />
            </label>
            <label htmlFor='phone'>
              <span>핸드폰 번호</span>
              <input
                type='text'
                ref={phoneRef}
                {...phone.data}
                disabled={isEdit === false}
              />
            </label>
            <label htmlFor='zipcode'>
              <span>우편번호</span>
              <input
                type='text'
                ref={zipCodeRef}
                {...zipCode.data}
                disabled={isEdit === false}
              />
            </label>
            <label htmlFor='address1'>
              <span>주소 1</span>
              <input
                type='text'
                ref={address1Ref}
                {...address1.data}
                disabled={isEdit === false}
              />
            </label>
            <label htmlFor='address2'>
              <span>주소 2</span>
              <input
                type='text'
                ref={address2Ref}
                {...address2.data}
                disabled={isEdit === false}
              />
            </label>
            <label htmlFor='payment'>
              <span>주문방법</span>
              <input
                type='text'
                ref={paymentRef}
                {...payment.data}
                disabled={isEdit === false}
              />
            </label>
            <label htmlFor='mileage'>
              <span>사용 마일리지</span>
              <input
                type='text'
                ref={mileageRef}
                {...mileage.data}
                disabled={isEdit === false}
              />
            </label>
            <label htmlFor='price'>
              <span>주문금액</span>
              <input
                type='text'
                ref={priceRef}
                {...price.data}
                disabled={isEdit === false}
              />
            </label>
            <label htmlFor='request'>
              <span>고객 요청사항</span>
              <input
                type='text'
                ref={requestRef}
                {...request.data}
                disabled={isEdit === false}
              />
            </label>
            <label htmlFor='status'>
              <span>주문상태</span>
              <select
                ref={statusRef}
                value={status}
                onChange={onChangeStatus}
                disabled={isEdit === false}
              >
                <option value='결제 대기중'>결제 대기중</option>
                <option value='배송 준비중'>배송 준비중</option>
                <option value='배송중'>배송중</option>
                <option value='배송 완료'>배송 완료</option>
              </select>
            </label>
            <div>
              <button onClick={onClickEdit}>{label}</button>
              <button onClick={() => onClickDeleteOrder(order.orderId)}>삭제</button>
            </div>
          </div>

          <Heading3>주문한 상품 리스트</Heading3>
          <div css={orderDetailListStyle}>
            {orderDetail.map((item) => (
              <OrderDetailList key={item.orderDNb} item={item} />
            ))}
          </div>
        </AdminLayout>
      </AppLayout>
    </>
  );
}
