import React from 'react';
import tw, { css } from 'twin.macro';

interface IHeading2Props {
  children: React.ReactNode;
}

export function Heading2({ children, }: IHeading2Props) {
  const Heading2Style = css`
    ${tw` pb-[20px] mb-[20px] border-b-[1px] border-solid border-b-black-base font-[700] text-[2rem] `}
  `;

  return (
    <>
      <h2 css={Heading2Style}>{children}</h2>
    </>
  );
}
