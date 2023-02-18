import React from 'react';
import { css } from 'twin.macro';

interface IHiddenSpanProps {
  children: React.ReactNode;
}

export function HiddenSpan({ children, }: IHiddenSpanProps) {
  const spanStyle = css`
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: polygon(0 0, 0 0, 0 0);
  `;

  return (
    <>
      <span css={spanStyle}>{children}</span>
    </>
  );
}
