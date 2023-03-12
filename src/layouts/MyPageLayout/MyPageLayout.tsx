import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import tw, { css } from 'twin.macro';
import { MyPageLink } from '@/components/Layout/MyPageLayout';
import { contentStyle, menuStyle, mypageLayoutStyle } from './style';

interface IMyPageLayoutProps {
  pageId: string;
  children: React.ReactNode;
}

export function MyPageLayout({ pageId, children, }: IMyPageLayoutProps) {
  const [ isMain, setIsMain, ] = useState(false);
  const [ isWish, setIsWish, ] = useState(false);
  const navi = useNavigate();
  const { pathname, } = useLocation();

  const onClickDashBoard = useCallback(() => {
    navi('/mypage/main');
  }, []);

  const onClickWisiList = useCallback(() => {
    navi('/mypage/wishlist');
  }, []);

  useEffect(() => {
    if (pathname === '/mypage/main') {
      setIsMain(true);
    } else if (pathname === '/mypage/wishlist') {
      setIsWish(true);
    }
  }, [ pathname, ]);

  const mypageQyestionStyle = css`
    ${pathname.includes('/mypage/question') && tw` text-point-link font-[900] `}
  `;

  return (
    <>
      <div id={pageId} css={mypageLayoutStyle}>
        <div css={menuStyle}>
          <div>
            <p
              className={isMain ? 'current' : 'dash'}
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
              <MyPageLink link='/mypage/delivery'>배송 내역</MyPageLink>
            </div>
            <p>BOARD</p>
            <div>
              <MyPageLink link='/mypage/review'>리뷰 내역</MyPageLink>
              <MyPageLink
                link='/mypage/question?current=question'
                styles={mypageQyestionStyle}
              >
                문의 내역
              </MyPageLink>
            </div>
            <p
              className={isWish ? 'current' : 'dash'}
              onClick={onClickWisiList}
            >
              WISH LIST
            </p>
          </div>
        </div>
        <div css={contentStyle}>{children}</div>
      </div>
    </>
  );
}
