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
            value={item.id}
            onChange={() => onChangeSelect(item.id)}
            checked={items.includes(item.id)}
          />
        </p>
        <p onClick={() => onClickDetail(item.id)}>{item.id}</p>
        <p>{item.user_id}</p>
        <p>{paymentString[item.payment]}</p>
        <p>{item.price}</p>
        <p>{item.order_status}</p>
      </div>
    </>
  );
}
