import React from 'react';
import { Link } from 'react-router-dom';
import { navStyle } from './navStyle';

export function Nav() {
  return (
    <>
      <nav css={navStyle}>
        <ul>
          <li>
            <Link to='/products/custom'>주문제작</Link>
          </li>
          <li>
            <Link to='/products/design'>디자인</Link>
          </li>
          <li>
            <Link to='/products/etc'>ETC</Link>
          </li>
          <li>
            <Link to='/community/notice'>커뮤니티</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
