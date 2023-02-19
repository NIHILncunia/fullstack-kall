import { Global } from '@emotion/react';
import React, {
  FormEvent, MouseEvent, useCallback, useRef, useState
} from 'react';
import { useLocation } from 'react-router';
import tw, { css } from 'twin.macro';
import { AppLayout } from '@/layouts';
import { Heading2 } from '@/components/Content';
import { useInput } from '@/hooks';

export function FindId() {
  const [ findType, setFindType, ] = useState('email');

  const location = useLocation();

  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();

  const name = useInput(nameRef, 'name');
  const email = useInput(emailRef, 'email');
  const phone = useInput(phoneRef, 'phone');

  const onClickType = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setFindType(e.currentTarget.dataset.type);
  }, []);

  const onSubmitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('POST to /users/find-id', {
      name: name.value,
      email: email.value,
    });
  }, [ name, email, ]);

  const globalStyles = css`
    main {
      ${tw` !w-[600px] `}
    }
  `;

  return (
    <>
      <Global styles={globalStyles} />
      <AppLayout title='아이디 찾기' url={location.pathname}>
        <div id='find-id-page'>
          <Heading2>아이디 찾기</Heading2>
          <p>아이디를 찾는 방법을 선택해주세요.</p>
          <div>
            <button data-type='email' onClick={onClickType}>본인확인 이메일로 인증</button>
            <button data-type='phone' onClick={onClickType}>등록된 휴대전화로 인증</button>

            <form onSubmit={onSubmitForm}>
              <label htmlFor='name'>
                <span>이름</span><input type='text' {...name} />
              </label>
              {findType === 'email' && (
                <label htmlFor='email'>
                  <span>이메일</span><input type='email' {...email} />
                </label>
              )}
              {findType === 'phone' && (
                <label htmlFor='phone'>
                  <span>휴대폰 번호</span><input type='text' {...phone} />
                </label>
              )}
              <button>아이디 찾기</button>
            </form>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
