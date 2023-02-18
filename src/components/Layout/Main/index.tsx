import React from 'react';
import { mainStyle } from './mainStyle';

interface IMain {
  children: React.ReactNode;
}

export function Main({ children, }: IMain) {
  return (
    <>
      <main css={mainStyle}>{children}</main>
    </>
  );
}
