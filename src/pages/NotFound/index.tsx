import React from 'react';
import { useLocation } from 'react-router';
import tw, { css } from 'twin.macro';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/layouts';

export function NotFound() {
  const location = useLocation();

  const notFoundStyle = css`
    ${tw` py-[250px] text-center text-black-base `}

    & h2 {
      ${tw` text-[2rem] font-[900] mb-[5px] `}

      & > span {
        ${tw` text-red-600 font-[900] `}
      }
    }

    & p {
      ${tw` text-[1.5rem] `}

      & a {
        ${tw` text-point-link `}
        ${tw` hover:text-point-h-link hover:underline `}
      }
    }
  `;

  return (
    <>
      <AppLayout title='페이지를 찾을 수 없습니다.'>
        <div id='notfound-page' css={notFoundStyle}>
          <h2><span>{location.pathname}</span>에 대한 페이지가 존재하지 않습니다.</h2>
          <p><Link to='/'>홈페이지</Link>로 돌아가거나 주소를 다시 확인해주세요.</p>
        </div>
      </AppLayout>
    </>
  );
}
