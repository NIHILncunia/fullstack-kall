import { SerializedStyles } from '@emotion/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw, { css } from 'twin.macro';

interface IMyPageLinkProps {
  link: string;
  children: React.ReactNode;
  styles?: SerializedStyles;
}

export function MyPageLink({ link, children, styles, }: IMyPageLinkProps) {
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
    ${styles}
  `;

  return (
    <>
      <Link to={link} css={linkStyle}>{children}</Link>
    </>
  );
}
