import React from 'react';
import { Link } from 'react-router-dom';
import { navStyle } from './navStyle';

export function Nav() {
  return (
    <>
      <nav css={navStyle}>
        <ul>
          <li>
            <Link to='/product'>주문제작</Link>
          </li>
          <li>
            <Link to='/design'>디자인</Link>
          </li>
          <li>
            <Link to='/etc'>ETC</Link>
          </li>
          <li>
            <Link to='/community/guide'>커뮤니티</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
