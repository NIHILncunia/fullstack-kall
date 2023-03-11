import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IOrder } from '@/types/tables.types';

interface IOrderListProps {
  item: IOrder;
}

const payString = {
  card: '카드결제',
};

export function OrderList({ item, }: IOrderListProps) {
  const navi = useNavigate();

  return (
    <>
      <div className='list-content'>
        <p onClick={() => navi(`/mypage/order/${item.id}`)}>
          {item.id}
        </p>
        <p>{payString[item?.payment]}</p>
        <p>{item.price.toLocaleString()}원</p>
        <p>{item.order_status}</p>
      </div>
    </>
  );
}
