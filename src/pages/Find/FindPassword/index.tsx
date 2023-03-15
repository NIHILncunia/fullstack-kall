import React, {
  FormEvent, useCallback, useRef, useState
} from 'react';
import { Link } from 'react-router-dom';
import { Global } from '@emotion/react';
import tw, { css } from 'twin.macro';
import { AppLayout } from '@/layouts';
import { Heading2, Heading3 } from '@/components/Content';
import { useInput } from '@/hooks';
import {
  findPasswordPageStyle, formStyle, Message, pStyle
} from './style';
import { kallInstance } from '@/data/axios.data';

export function FindPassword() {
  const [ isOpen, setIsOpen, ] = useState(false);
  const [ error, setError, ] = useState(false);
  const [ pass, setPass, ] = useState('');
  const [ message, setMessage, ] = useState(<>비밀번호를 찾고자 하는 아이디를 입력해주세요.</>);

  const idRef = useRef<HTMLInputElement>();

  const id = useInput(idRef, 'id');

  const onSubmitOpen = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    kallInstance.put(`/users/${id.data.value}/password`)
      .then((res) => {
        setIsOpen(true);
        setError(false);
        setPass(res.data);
        setMessage(<>{id.data.value}님 임시 비밀번호를 지급합니다. 로그인하세요.</>);
      })
      .catch((error) => {
        setError(true);
        setMessage(<>일치하는 회원정보가 없습니다. 다시 확인해주세요.</>);
      });
  }, [ id.data.value, ]);

  const globalStyles = css`
    main {
      ${tw` !w-[600px] `}
    }
  `;

  return (
    <>
      <Global styles={globalStyles} />
      <AppLayout title='비밀번호 찾기'>
        <div id='find-password-page' css={findPasswordPageStyle}>
          <Heading2>비밀번호 찾기</Heading2>
          {/* 에러 여부에 따라 색깔과 문구가 바뀜. */}
          <Message error={error}>{message}</Message>
          {!isOpen && (
            <>
              <form onSubmit={onSubmitOpen} css={formStyle}>
                <input type='text' ref={idRef} required {...id.data} />
                <button>다음</button>
              </form>
            </>
          )}
          {isOpen && (
            <div css={tw`border border-black-200 bg-black-50 p-[10px] flex items-center justify-center mb-[30px]`}>
              <p css={tw`text-[1.5rem] font-[900]`}>{pass}</p>
            </div>
          )}
          <Heading3>아이디가 기억나지 않는다면?</Heading3>
          <p css={pStyle} tw='mb-[20px]'>
            <Link to='/find/id'>아이디 찾기</Link>로 바로가기
          </p>
          <Heading3>아직 회원이 아니신가요?</Heading3>
          <p css={pStyle}>
            <Link to='/signup'>회원가입</Link>으로 바로가기
          </p>
        </div>
      </AppLayout>
    </>
  );
}
