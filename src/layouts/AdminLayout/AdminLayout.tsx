import React from 'react';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import { adminMenuStyle } from './style';

interface IAdminLayoutProps {
  pageId: string;
  children: React.ReactNode;
}

export function AdminLayout({ pageId, children, }: IAdminLayoutProps) {
  return (
    <>
      <div id={pageId} css={tw`p-[50px] text-[1.2rem] text-black-base`}>
        <div className='admin-menu' css={adminMenuStyle}>
          <Link to='/admin/users'>회원 관리</Link>
          <Link to='/admin/products'>상품 관리</Link>
          <Link to='/admin/orders'>주문 관리</Link>
          <Link to='/admin/refunds'>반품 관리</Link>
          <Link to='/admin/review'>리뷰 관리</Link>
        </div>
        <div className='admin-content'>
          {children}
        </div>
      </div>
    </>
  );
}
