import React from 'react';
import { AdminLayout, AppLayout } from '@/layouts';

export function AdminMain() {
  return (
    <>
      <AppLayout title='관리자 대시보드'>
        <AdminLayout pageId='admin-main-page'>
          어드민 대시보드
        </AdminLayout>
      </AppLayout>
    </>
  );
}
