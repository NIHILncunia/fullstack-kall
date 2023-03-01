import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout, MyPageLayout } from '@/layouts';
import { Heading3 } from '@/components/Content';
import { PassCheck, UserInfoEditForm } from '@/components/Content/MyPage';
import { withDrawalStyle } from './style';

export function MyPageUserInfoEdit() {
  const [ isUser, setIsUser, ] = useState(true);

  return (
    <>
      <AppLayout title='개인정보수정'>
        <MyPageLayout pageId='user-info-edit-page'>
          <Heading3>개인정보수정</Heading3>
          {isUser === false && (
            <PassCheck setIsUser={setIsUser} />
          )}

          {isUser && (
            <>
              <UserInfoEditForm />

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
