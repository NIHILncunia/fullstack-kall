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
import { getUserById } from '@/hooks/trueQuery/users';

export function FindPassword() {
  const [ isOpen, setIsOpen, ] = useState(false);
  const [ error, setError, ] = useState(false);
  const [ complete, setComplete, ] = useState(false);
  const [ message, setMessage, ] = useState(<>비밀번호를 찾고자 하는 아이디를 입력해주세요.</>);

  const idRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const passwordCheckRef = useRef<HTMLInputElement>();

  const id = useInput(idRef, 'id');
  const password = useInput(passwordRef, 'password');
  const passwordCheck = useInput(passwordCheckRef, 'password-check');

  const onSubmitOpen = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await getUserById(id.data.value);

      setIsOpen(true);
      setError(false);
      setMessage(<>{res.userId}님 비밀번호를 재설정하세요.</>);
    } catch (error) {
      setError(true);
      setMessage(<>일치하는 회원정보가 없습니다. 다시 확인해주세요.</>);
    }
  }, [ id.data.value, ]);

  const onSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.data.value === passwordCheck.data.value) {
      setComplete(true);
      setMessage((<>비밀번호 재설정이 완료되었습니다.<br />이제 로그인하세요.</>));
      setError(false);
    } else {
      setError(true);
      setMessage(<>비밀번호가 일치하지 않습니다.</>);
    }
  }, [ password.data.value, passwordCheck.data.value, ]);

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
          {isOpen && !complete && (
            <form onSubmit={onSubmitForm} css={formStyle}>
              <input
                type='password'
                ref={passwordRef}
                required
                placeholder='7자리 이상'
                {...password.data}
              />
              <input
                type='password'
                ref={passwordCheckRef}
                required
                placeholder='7자리 이상'
                {...passwordCheck.data}
              />
              <button>비밀번호 재설정</button>
            </form>
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
