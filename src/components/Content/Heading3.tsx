import React from 'react';
import tw, { css } from 'twin.macro';

interface IHeading3Props {
  children: React.ReactNode;
}

export function Heading3({ children, }: IHeading3Props) {
  const Heading3Style = css`
    ${tw` pb-[20px] mb-[20px] border-b-[1px] border-solid border-b-black-base font-[700] text-[1.4rem] `}
  `;

  return (
    <>
      <h3 css={Heading3Style}>{children}</h3>
    </>
  );
}
