import React, { FormEvent, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Global } from '@emotion/react';
import tw, { css } from 'twin.macro';
import { useCookies } from 'react-cookie';
import { AppLayout } from '@/layouts';
import { Heading2, Heading3 } from '@/components/Content';
import {
  buttonStyle, checksStyle, inputsStyle, kakaoSigninStyle, signInPageStyle, signInLinkStyle, signinQuestionStyle
} from './style';
import kakaoLogin from '@/images/kakao_login_large_wide.png';
import { useInput } from '@/hooks';

export function SIgnIn() {
  const navi = useNavigate();
  const idRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const id = useInput(idRef, 'id');
  const password = useInput(passwordRef, 'password');

  const [ cookies, setCookie, ] = useCookies([ 'id', 'role', ]);

  const onSubmitSignInForm = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 실제론 uewMutations를 용할 것.

    setCookie('id', 'user_1');
    setCookie('role', 'user');
    navi('/');
  }, []);

  return (
    <>
      <Global
        styles={css`
          main {
            ${tw` !w-[600px] `}
          }
        `}
      />
      <AppLayout title='로그인'>
        <div id='signin-page' css={signInPageStyle}>
          <div className='signin'>
            <Heading2>로그인</Heading2>
            <form onSubmit={onSubmitSignInForm}>
              <div className='form-input' css={inputsStyle}>
                <input
                  type='text'
                  placeholder='아이디를 입력하세요.'
                  required
                  ref={idRef}
                  {...id}
                />
                <input
                  type='text'
                  placeholder='비밀번호를 입력하세요.'
                  required
                  ref={passwordRef}
                  {...password}
                />
              </div>
              <div className='form-check' css={checksStyle}>
                <label htmlFor='id-save'>
                  <input type='checkbox' id='id-save' /> 아이디 저장
                </label>
                <label htmlFor='auto-signin'>
                  <input type='checkbox' id='auto-signin' /> 자동 로그인
                </label>
              </div>
              <button css={buttonStyle}>로그인</button>
            </form>
            <div css={signInLinkStyle}>
              <Link to='/find/id'>아이디 찾기</Link>
              <Link to='/find/password'>비밀번호 찾기</Link>
              <Link to='/signup'>회원가입</Link>
            </div>
          </div>

          <div className='social-signin'>
            <Heading3>SNS로 간편하게 로그인하세요.</Heading3>
            <button className='kakao-signin' css={kakaoSigninStyle}>
              <img src={kakaoLogin} alt='카카오 로그인' />
            </button>
          </div>

          <div className='signin-question' css={signinQuestionStyle}>
            <Link to='/community/guide'>로그인에 문제가 있으신가요?</Link>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
