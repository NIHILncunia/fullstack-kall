import React from 'react';
import { useIsFetching, useIsMutating } from 'react-query';
import tw, { css } from 'twin.macro';

export function IsLoading() {
  const isloading = useIsFetching();
  const isMutating = useIsMutating();

  const style = css`
    ${(isloading || isMutating) ? tw` block ` : tw` hidden `}
  `;

  return (
    <>
      <div css={style}>로딩중</div>
    </>
  );
}
