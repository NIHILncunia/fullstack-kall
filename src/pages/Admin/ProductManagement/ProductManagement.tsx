import React from 'react';
import { AdminLayout, AppLayout } from '@/layouts';
import { Heading2 } from '@/components/Content';
import { ProductList } from '@/components/Content/Admin';

export function ProductManagement() {
  return (
    <>
      <AppLayout title='상품 관리'>
        <AdminLayout pageId='admin-product-page'>
          <Heading2>상품 관리</Heading2>

          <ProductList />
        </AdminLayout>
      </AppLayout>
    </>
  );
}
