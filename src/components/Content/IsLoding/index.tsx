import React from 'react';
import { useIsFetching } from 'react-query';
import tw, { css } from 'twin.macro';

export function IsLoding() {
  const isloading = useIsFetching();

  const style = css`
    ${isloading ? tw` block ` : tw` hidden `}
  `;

  return (
    <>
      <div css={style}>로딩중</div>
    </>
  );
}
