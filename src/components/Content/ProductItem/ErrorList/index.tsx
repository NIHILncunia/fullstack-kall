import { AxiosError } from 'axios';
import React from 'react';
import tw from 'twin.macro';

interface IErrorListProps {
  error: AxiosError;
}

export function ErrorList({ error, }: IErrorListProps) {
  return (
    <>
      <div css={tw` text-[2rem] text-center text-red-500 my-[200px] `}>
        <p>데이터를 불러오는 도중 에러가 발생했습니다.</p>
        <p>{error.message}</p>
      </div>
    </>
  );
}
