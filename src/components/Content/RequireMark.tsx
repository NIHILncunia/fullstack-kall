import React from 'react';
import tw, { css } from 'twin.macro';

export function RequireMark() {
  const markStyle = css`
    ${tw` text-red-500 font-[900] not-italic `}
  `;

  return (
    <>
      <i css={markStyle}>*</i>
    </>
  );
}
