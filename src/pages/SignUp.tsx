import React from 'react';
import { AppLayout } from '@/layouts';

export function SignUp() {
  return (
    <>
      <AppLayout title='회원가입' url='/signup'>
        <div id='signup-page'>
          회원가입
        </div>
      </AppLayout>
    </>
  );
}
