import React from 'react';
import { AppLayout, CommunityLayout } from '@/layouts';
import { Heading2 } from '@/components/Content';
import { MapBlock } from '@/components/Content/Community';
import { visitInfoStyle } from './style';

export function CommunityVisit() {
  return (
    <>
      <AppLayout title='커뮤니티 - 찾아오시는길'>
        <CommunityLayout pageId='community-visit-page'>
          <Heading2>찾아오시는 길</Heading2>
          <MapBlock />
          <div css={visitInfoStyle}>
            <div>
              <p>주소</p>
              <p>경기 성남시 분당구 돌마로 46 (광천빌딩 5층)</p>
            </div>

            <div>
              <p>지하철</p>
              <p>신분당, 수인분당 / 미금역 6번출구, 약 112m</p>
            </div>

            <div>
              <p>일반버스</p>
              <p>250, 310, 380, 700-2, 720-1</p>
            </div>

            <div>
              <p>마을버스</p>
              <p>11, 14, 15, 16, 17(미금역-동천역), 32, 5(상현지구대,금호5단지-미금역,2001아울렛), 7(보바스기념병원-서울대병원)</p>
            </div>

            <div>
              <p>직행버스</p>
              <p>1241</p>
            </div>

            <div>
              <p>연락처</p>
              <p>031-712-7447</p>
            </div>
          </div>
        </CommunityLayout>
      </AppLayout>
    </>
  );
}
