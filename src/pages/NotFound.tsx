import React from 'react';
import { useLocation } from 'react-router';
import { AppLayout } from '@/layouts';

export function NotFound() {
  const location = useLocation();

  console.log(location);
  return (
    <>
      <AppLayout title='페이지를 찾을 수 없습니다.' url='/404'>
        <div id='notfound-page'>
          존재하지 않는 페이지
        </div>
      </AppLayout>
    </>
  );
}
