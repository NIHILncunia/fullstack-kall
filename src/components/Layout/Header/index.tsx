import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { FaSearch } from 'react-icons/fa';
import kallLogo from '@/images/kall-logo.png';
import { HiddenSpan } from '@/components/Content';
import { haederBottomStyle, headerStyle, headerTopStyle } from './headerStyle';
import { Nav } from '../Nav';

export function Header() {
  const [ cookies, ] = useCookies([ 'id', 'role', ]);
  const { id, role, } = cookies;

  return (
    <>
      <header css={headerStyle}>
        <div css={headerTopStyle}>
          <h1 className='header-logo'>
            <HiddenSpan>KALL</HiddenSpan>
            <Link to='/'>
              <img src={kallLogo} alt='KALL 로고' />
            </Link>
          </h1>
          <Nav />
          <div className='header-search'>
            <form>
              <input type='search' placeholder='검색어를 입력하세요' />
              <button>
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
        <div css={haederBottomStyle}>
          <ul>
            {id ? (
              <>
                <li>
                  <Link to='/signout'>로그아웃</Link>
                </li>
                {
                  role !== 'admin'
                    ? (
                      <li>
                        <Link to='/mypage'>마이페이지</Link>
                      </li>
                    )
                    : (
                      <li>
                        <Link to='/admin'>관리</Link>
                      </li>
                    )
                }
                <li>
                  <Link to='/cart'>장바구니</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/signin'>로그인</Link>
                </li>
                <li>
                  <Link to='/signup'>회원가입</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
    </>
  );
}
