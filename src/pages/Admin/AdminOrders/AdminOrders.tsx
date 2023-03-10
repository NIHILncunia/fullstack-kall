import React, { useState } from 'react';
import tw from 'twin.macro';
import { AdminLayout, AppLayout } from '@/layouts';
import { Heading2 } from '@/components/Content';
import { OrderListItem } from '@/components/Content/Admin';
import { listHeaderStyle } from './style';
import { useOrders } from '@/hooks/trueQuery/order';

export function AdminOrders() {
  const [ items, setItems, ] = useState<number[]>([]);
  const orders = useOrders();
  console.log(orders);

  return (
    <>
      <AppLayout title='주문 관리'>
        <AdminLayout pageId='admin-order-page'>
          <Heading2>주문 관리</Heading2>
          <div css={tw`flex flex-col gap-[2px]`}>
            <div css={listHeaderStyle}>
              <p>선택</p>
              <p>주문 번호</p>
              <p>주문자 아이디</p>
              <p>주문방법</p>
              <p>주문금액</p>
              <p>주문상태</p>
            </div>
            {orders?.map((item) => (
              <OrderListItem
                key={item.id}
                item={item}
                items={items}
                setItems={setItems}
              />
            ))}
          </div>
        </AdminLayout>
      </AppLayout>
    </>
  );
}
