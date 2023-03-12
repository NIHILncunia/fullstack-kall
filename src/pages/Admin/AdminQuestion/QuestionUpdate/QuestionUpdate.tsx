import React from 'react';
import { useLocation, useParams } from 'react-router';
import tw from 'twin.macro';
import { AdminLayout, AppLayout } from '@/layouts';
import { UpdateForm } from './UpdateForm';

export function QuestionUpdate() {
  const { pathname, } = useLocation();
  const params = useParams();

  return (
    <>
      <AppLayout title='문의 수정'>
        {
          pathname.includes('mypage')
            ? (
              <div id='question-edit-page' css={tw`py-[50px] text-black-base text-[1.2rem]`}>
                <UpdateForm id={params.id} />
              </div>
            )
            : (
              <AdminLayout pageId='question-edit-page'>
                <UpdateForm id={params.id} />
              </AdminLayout>
            )
        }
      </AppLayout>
    </>
  );
}
