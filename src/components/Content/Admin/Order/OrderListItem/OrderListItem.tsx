import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { IOrder } from '@/types/tables.types';
import { orderListItemStyle } from './style';

interface IOrderListItemProps {
  item: IOrder;
  items: number[];
  setItems: React.Dispatch<React.SetStateAction<number[]>>
}

const paymentString = {
  card: '카드결제',
};

export function OrderListItem({ item, items, setItems, }: IOrderListItemProps) {
  const navi = useNavigate();

  const onChangeSelect = useCallback((id: number) => {
    setItems((prev) => (
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [ ...prev, id, ]
    ));
  }, []);

  const onClickDetail = useCallback((id: number) => {
    navi(`/admin/orders/${id}`);
  }, []);

  return (
    <>
      <div css={orderListItemStyle}>
        <p>
          <input
            type='checkbox'
            name='order'
            value={item.orderId}
            onChange={() => onChangeSelect(item.orderId)}
            checked={items.includes(item.orderId)}
          />
        </p>
        <p onClick={() => onClickDetail(item.orderId)}>{item.orderId}</p>
        <p>{item.userDTO.userId}</p>
        <p>{paymentString[item.payment]}</p>
        <p>{item.price.toLocaleString()}원</p>
        <p>{item.order_status}</p>
      </div>
    </>
  );
}
