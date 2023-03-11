import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw, { css } from 'twin.macro';

interface IMyPageLinkProps {
  link: string;
  children: React.ReactNode;
}

export function MyPageLink({ link, children, }: IMyPageLinkProps) {
  const { pathname, } = useLocation();

  const currentStyle = css`
    ${tw` text-point-link font-[900] `}
  `;

  const normalStyle = css`
    ${tw` hover:underline hover:text-black-base hover:font-[900] `}
  `;

  const linkStyle = css`
    ${tw` text-black-600 `}
    ${pathname.includes(link) ? currentStyle : normalStyle}
  `;

  return (
    <>
      <Link to={link} css={linkStyle}>{children}</Link>
    </>
  );
}
