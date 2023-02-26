import React from 'react';
import { AppLayout, CommunityLayout } from '@/layouts';
import { Heading2 } from '@/components/Content';
import { DirectForm } from '@/components/Content/Community';

export function CommunityDirect() {
  return (
    <>
      <AppLayout title='커뮤니티 - 1:1 문의'>
        <CommunityLayout pageId='community-direct-page'>
          <Heading2>1:1 문의</Heading2>
          <DirectForm />
        </CommunityLayout>
      </AppLayout>
    </>
  );
}
