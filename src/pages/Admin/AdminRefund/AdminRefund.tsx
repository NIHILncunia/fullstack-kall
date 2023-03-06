import React from 'react';
import { Heading2 } from '@/components/Content';
import { AdminLayout, AppLayout } from '@/layouts';
import { useRefunds } from '@/hooks/trueQuery/refund';
import { RefundListItem } from '@/components/Content/Admin';
import { refundListStyle } from './style';

export function AdminRefund() {
  const refunds = useRefunds();

  return (
    <>
      <AppLayout title='반품 관리'>
        <AdminLayout pageId='admin-refund-page'>
          <Heading2>반품 관리</Heading2>
          <div css={refundListStyle}>
            <div className='list-header'>
              <div>반품 번호</div>
              <div>제목</div>
              <div>주문자명</div>
              <div>처리상태</div>
            </div>
            {refunds.map((item) => (
              <RefundListItem key={item.id} item={item} />
            ))}
          </div>
        </AdminLayout>
      </AppLayout>
    </>
  );
}
