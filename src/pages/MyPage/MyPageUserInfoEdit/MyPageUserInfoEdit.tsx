import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout, MyPageLayout } from '@/layouts';
import { Heading2 } from '@/components/Content';
import { PassCheck, UserInfoEditForm } from '@/components/Content/MyPage';
import { withDrawalStyle } from './style';

export function MyPageUserInfoEdit() {
  const [ isUser, setIsUser, ] = useState(false);

  return (
    <>
      <AppLayout title='개인정보수정'>
        <MyPageLayout pageId='user-info-edit-page'>
          <Heading2>개인정보수정</Heading2>
          {isUser === false && (
            <PassCheck setIsUser={setIsUser} />
          )}

          {isUser && (
            <>
              <UserInfoEditForm />

              <p css={withDrawalStyle}>
                비밀번호 수정은 <Link to='/mypage/passedit'>이 링크</Link>에서 진행할 수 있습니다.
              </p>

              <p css={withDrawalStyle}>
                회원 탈퇴를 원하시면 <Link to='/withdrawal'>이 링크</Link>를 클릭해주세요.
              </p>
            </>
          )}
        </MyPageLayout>
      </AppLayout>
    </>
  );
}
