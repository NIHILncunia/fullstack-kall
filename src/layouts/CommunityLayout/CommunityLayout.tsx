import React from 'react';
import { MenuLink } from '@/components/Layout/CommunityLayout';
import { contentStyle, guidePageStyle, menuStyle } from './style';

interface ICommunityLayoutProps {
  children: React.ReactNode;
  pageId: string;
}

export function CommunityLayout({ children, pageId, }: ICommunityLayoutProps) {
  return (
    <>
      <div id={pageId} css={guidePageStyle}>
        <div className='menu-block' css={menuStyle}>
          <ul>
            <MenuLink link='/community/notice'>공지사항</MenuLink>
            <MenuLink link='/community/faq'>FAQ</MenuLink>
            <MenuLink link='/community/visit'>찾아오시는 길</MenuLink>
            <MenuLink link='/community/direct'>1:1 문의</MenuLink>
            <MenuLink link='/community/review'>리뷰</MenuLink>
          </ul>
        </div>
        <div className='content-block' css={contentStyle}>
          {children}
        </div>
      </div>
    </>
  );
}
