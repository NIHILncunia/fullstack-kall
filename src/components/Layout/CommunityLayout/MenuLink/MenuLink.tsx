import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw, { css } from 'twin.macro';

interface IMenuLinkProps {
  link: string;
  children: React.ReactNode;
}

export function MenuLink({ link, children, }: IMenuLinkProps) {
  const { pathname, } = useLocation();

  const currentLinkStyle = css`
    ${tw` font-[900] bg-point-h-base text-white `}
  `;

  const defaultLinkStyle = css`
    ${tw` text-black-base bg-black-50 border-black-100 `}
  `;

  const linkStyle = css`
    ${tw` shrink-0 flex-[1] text-center `}

    & > a {
      ${tw` p-[10px] block border border-solid `}
      ${pathname === link ? currentLinkStyle : defaultLinkStyle}
    }
  `;

  return (
    <>
      <li css={linkStyle}>
        <Link to={link}>{children}</Link>
      </li>
    </>
  );
}
