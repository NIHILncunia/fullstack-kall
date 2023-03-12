import React from 'react';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import { AppLayout, MyPageLayout } from '@/layouts';
import { Heading2 } from '@/components/Content';
import { useUserById } from '@/hooks/trueQuery/users';
import { useOrderByUserId } from '@/hooks/trueQuery/order';
import { mileageBlockStyle, mileageListStyle } from './style';

export function MyPageMileage() {
  const [ { id, }, ] = useCookies([ 'id', ]);
  const userData = useUserById(id);
  const orderDataByUserId = useOrderByUserId(userData.userId, {
    enabled: userData && 'id' in userData,
  });

  const mileageLog = orderDataByUserId.filter((item) => item.mileage !== 0)
    .map((item) => (
      <div className='list-content' key={item.id}>
        <p>{moment(item.date).format('YYYY-MM-DD HH:mm:ss')}</p>
        <p>상품 구매</p>
        <p>-</p>
        <p>{item.mileage.toLocaleString()}원</p>
      </div>
    ));

  return (
    <>
      <AppLayout title='마일리지 내역'>
        <MyPageLayout pageId='mypage-mileage-list'>
          <Heading2>마일리지 내역</Heading2>

          <div className='mileage-block' css={mileageBlockStyle}>
            <p>
              {userData.name}({userData.userId})님의 마일리지 누적금액은
              <span>{userData.mileage?.toLocaleString()}원</span>
              입니다.
            </p>
          </div>

          <div className='mileage-list' css={mileageListStyle}>
            <div className='list-header'>
              <p>날짜</p>
              <p>내용</p>
              <p>적립 마일리지</p>
              <p>소모 마일리지</p>
            </div>
            <div className='list-content'>
              <p>{moment(userData.date).format('YYYY-MM-DD HH:mm:ss')}</p>
              <p>회원가입</p>
              <p>3,000원</p>
              <p>-</p>
            </div>
            {mileageLog}
          </div>
        </MyPageLayout>
      </AppLayout>
    </>
  );
}
