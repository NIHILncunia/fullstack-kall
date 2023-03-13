import React from 'react';
import { useParams } from 'react-router';
import tw from 'twin.macro';
import { useDirectById } from '@/hooks/trueQuery/direct';
import { AppLayout } from '@/layouts';
import { DirectDetailPage } from '@/components/Content/Admin';

export function DirectDetail() {
  const { id, } = useParams();
  const direct = useDirectById(Number(id));

  return (
    <>
      <AppLayout title={`1:1 문의 (문의 번호: ${direct.usQId})`}>
        <div id='direct-detail-page' css={tw`py-[50px] text-[1.2rem] text-black-base`}>
          <DirectDetailPage />
        </div>
      </AppLayout>
    </>
  );
}
