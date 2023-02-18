import React from 'react';
import { AppLayout } from '@/layouts';

export function SIgnIn() {
  return (
    <>
      <AppLayout title='로그인' url='/signin'>
        <div id='signin-page'>
          로그인
        </div>
      </AppLayout>
    </>
  );
}
