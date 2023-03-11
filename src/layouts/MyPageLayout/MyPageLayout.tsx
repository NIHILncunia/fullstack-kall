import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import tw from 'twin.macro';
import { MyPageLink } from '@/components/Layout/MyPageLayout';
import { contentStyle, menuStyle, mypageLayoutStyle } from './style';

interface IMyPageLayoutProps {
  pageId: string;
  children: React.ReactNode;
}

export function MyPageLayout({ pageId, children, }: IMyPageLayoutProps) {
  const [ isCrrent, setIsCurrent, ] = useState(false);
  const navi = useNavigate();
  const { pathname, } = useLocation();

  const onClickDashBoard = useCallback(() => {
    navi('/mypage/main');
  }, []);

  useEffect(() => {
    if (pathname === '/mypage/main') {
      setIsCurrent(true);
    }
  }, [ pathname, ]);

  return (
    <>
      <div id={pageId} css={mypageLayoutStyle}>
        <div css={menuStyle}>
          <div>
            <p
              className={isCrrent ? 'current' : 'dash'}
              onClick={onClickDashBoard}
              css={tw`mb-[10px]`}
            >
              DASHBOARD
            </p>
            <p>PROFILE</p>
            <div>
              <MyPageLink link='/mypage/edit'>개인정보수정</MyPageLink>
              <MyPageLink link='/mypage/address'>주소 관리</MyPageLink>
              <MyPageLink link='/mypage/mileage'>마일리지 내역</MyPageLink>
            </div>
            <p>ORDER</p>
            <div>
              <MyPageLink link='/mypage/order'>주문 내역</MyPageLink>
            </div>
            <p>BOARD</p>
            <div />
            <p>WISH LIST</p>
          </div>
        </div>
        <div css={contentStyle}>{children}</div>
      </div>
    </>
  );
}
