import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import tw, { css } from 'twin.macro';
import { getTodos } from '@/data/queries';
import { ITodo } from '@/types/todos.types';
import { AppLayout } from '@/layouts';

export function HomePage() {
  const {
    isLoading, isError, error, data,
  } = useQuery<ITodo[], Error>([ 'getTotos', ], getTodos);

  const noStyle = css`
    ${tw` mr-2 text-[1.2rem] p-2 bg-blue-500 inline-block rounded-1 text-black-50 `}
  `;

  const url = '/';

  if (isLoading) {
    return (
      <AppLayout title='로딩중...' url={url}>
        <div>로딩중</div>
      </AppLayout>
    );
  }

  if (isError) {
    return (
      <AppLayout title={`에러 - ${error.message}`} url={url}>
        <div>{error.message}</div>
      </AppLayout>
    );
  }

  return (
    <>
      <AppLayout
        title='홈'
        url='/'
      >
        <div>
          <h1>홈</h1>

          <h2>투두리스트</h2>
          <div>
            {data?.map((todo) => (
              <div key={todo.id}>
                <span css={noStyle}>{todo.id}</span>
                <Link to={`/todos/${todo.id}`}>[ {todo.title} ]</Link>
              </div>
            ))}
          </div>
        </div>
      </AppLayout>
    </>
  );
}
