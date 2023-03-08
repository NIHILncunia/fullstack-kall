import React from 'react';
import { useLocation, useParams } from 'react-router';
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
              <div id='question-edit-page'>
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
