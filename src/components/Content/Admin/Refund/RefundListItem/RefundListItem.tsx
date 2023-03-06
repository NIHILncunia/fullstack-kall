import React from 'react';
import { Link } from 'react-router-dom';
import { IRefund } from '@/types/tables.types';

interface IRefundListItemProps {
  item: IRefund;
}

export function RefundListItem({ item, }: IRefundListItemProps) {
  console.log(item);

  return (
    <>
      <div className='list-content'>
        <div>{item.id}</div>
        <div>
          <Link to={`/admin/refunds/${item.id}`}>{item.title}</Link>
        </div>
        <div>{item.user_id}</div>
        <div>{item.status}</div>
      </div>
    </>
  );
}
