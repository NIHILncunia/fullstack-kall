import React from 'react';
import tw from 'twin.macro';

export function LoadingList() {
  return (
    <>
      <div css={tw` text-[2rem] text-center my-[200px] `}>
        데이터를 불러오는 중...
      </div>
    </>
  );
}
