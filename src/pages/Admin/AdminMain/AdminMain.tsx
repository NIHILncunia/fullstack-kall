import React from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout, AppLayout } from '@/layouts';
import { adminLinkStyle } from './style';
import { Heading2 } from '@/components/Content';

export function AdminMain() {
  return (
    <>
      <AppLayout title='관리자 대시보드'>
        <AdminLayout pageId='admin-main-page'>
          <Heading2>관리자 대시보드</Heading2>
          <div css={adminLinkStyle}>
            <Link to='/admin/users'>회원 관리</Link>
            <Link to='/admin/products'>상품 관리</Link>
            <Link to='/admin/orders'>주문 관리</Link>
            <Link to='/admin/refunds'>반품 관리</Link>
          </div>
        </AdminLayout>
      </AppLayout>
    </>
  );
}
