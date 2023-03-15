import React, { useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { FaSearch } from 'react-icons/fa';
import kallLogo from '@/images/kall-logo.png';
import { HiddenSpan } from '@/components/Content';
import { haederBottomStyle, headerStyle, headerTopStyle } from './headerStyle';
import { Nav } from '../Nav';
import { useInput } from '@/hooks';

export function Header() {
  const navi = useNavigate();
  const keywordRef = useRef<HTMLInputElement>();
  const keyword = useInput(keywordRef, 'keyword');

  // eslint-disable-next-line no-unused-vars
  const [ cookies, setCookie, removeCookie, ] = useCookies([ 'id', 'role', 'q', ]);
  const { id, role, } = cookies;

  const onClickSignOut = useCallback(() => {
    removeCookie('id', { path: '/', expires: new Date(), });
    removeCookie('role', { path: '/', expires: new Date(), });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navi('/');
  }, []);

  const onSubmitSearch = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navi(`/search?keyword=${keyword.data.value}`);
    setCookie('q', keyword.data.value, { path: '/', });
  }, [ keyword, ]);

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
            <form onSubmit={onSubmitSearch}>
              <input
                type='search'
                placeholder='검색어를 입력하세요'
                ref={keywordRef}
                {...keyword.data}
              />
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
                  <button onClick={onClickSignOut}>로그아웃</button>
                </li>
                <li>
                  <Link to='/mypage/main'>마이페이지</Link>
                </li>
                {role === 'admin' && (
                  <li>
                    <Link to='/admin'>관리</Link>
                  </li>
                )}
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
