import React from 'react';
import tw, { css } from 'twin.macro';

interface IHiddenSpanProps {
  children: React.ReactNode;
}

export function HiddenSpan({ children, }: IHiddenSpanProps) {
  const spanStyle = css`
    ${tw` absolute w-[1px] h-[1px] m-[1px] overflow-hidden `}
    clip-path: polygon(0 0, 0 0, 0 0);
  `;

  return (
    <>
      <span css={spanStyle}>{children}</span>
    </>
  );
}
