import React from 'react';
import { Link } from 'react-router-dom';
import { IRefund } from '@/types/tables.types';

interface IRefundListItemProps {
  item: IRefund;
}

export function RefundListItem({ item, }: IRefundListItemProps) {
  return (
    <>
      <div className='list-content'>
        <div>{item.refundId}</div>
        <div>
          <Link to={`/admin/refunds/${item.refundId}`}>{item.title}</Link>
        </div>
        <div>{item.userDTO.userId}</div>
        <div>{item.status}</div>
      </div>
    </>
  );
}
