import { Global } from '@emotion/react';
import React, {
  FormEvent, MouseEvent, useCallback, useRef, useState
} from 'react';
import tw, { css } from 'twin.macro';
import { AppLayout } from '@/layouts';
import { Heading2 } from '@/components/Content';
import { useInput } from '@/hooks';
import {
  buttonStyles, EmailButton, findIdFormStyle, findIdPageStyle, messageStyle, PhoneButton
} from './style';
import { kallInstance } from '@/data/axios.data';

export function FindId() {
  const [ findType, setFindType, ] = useState('email');
  const [ id, setId, ] = useState('');
  const [ pass, setPass, ] = useState('');

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

    let resObj: { name: string; email?: string; phoneNb?: string; };

    if (findType === 'email') {
      resObj = {
        name: name.data.value,
        email: email.data.value,
      };

      kallInstance.get<string>(`/users/findIdByEmail?name=${resObj.name}&email=${resObj.email}`)
        .then((res) => {
          console.log(res.data);
          setId(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });

      console.log('[GET /users/findIdByEmail]', resObj);
    } else {
      resObj = {
        name: name.data.value,
        phoneNb: phone.data.value,
      };

      kallInstance.get<string>(`/users/findIdByPhone?name=${resObj.name}&phoneNb=${resObj.phoneNb}`)
        .then((res) => {
          console.log(res.data);
          setPass(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });

      console.log('[GET /users/findIdByPhone]', resObj);
    }
  }, [ name, email, phone, ]);

  const globalStyles = css`
    main {
      ${tw` !w-[600px] `}
    }
  `;

  return (
    <>
      <Global styles={globalStyles} />
      <AppLayout title='아이디 찾기'>
        <div id='find-id-page' css={findIdPageStyle}>
          <Heading2>아이디 찾기</Heading2>
          <p css={messageStyle}>아이디를 찾는 방법을 선택해주세요.</p>
          <div css={buttonStyles}>
            <EmailButton
              findType={findType}
              data-type='email'
              onClick={onClickType}
              disabled={findType === 'email'}
            >본인확인 이메일로 인증
            </EmailButton>
            <PhoneButton
              findType={findType}
              data-type='phone'
              onClick={onClickType}
              disabled={findType === 'phone'}
            >등록된 휴대전화로 인증
            </PhoneButton>
          </div>

          <form onSubmit={onSubmitForm} css={findIdFormStyle}>
            <label htmlFor='name'>
              <span>이름</span>
              <input
                type='text'
                required
                ref={nameRef}
                {...name.data}
              />
            </label>
            {findType === 'email' && (
              <label htmlFor='email'>
                <span>이메일</span>
                <input
                  type='email'
                  required
                  ref={emailRef}
                  {...email.data}
                />
              </label>
            )}
            {findType === 'phone' && (
              <label htmlFor='phone'>
                <span>휴대폰 번호</span>
                <input
                  type='text'
                  required
                  placeholder='-빼고 입력'
                  ref={phoneRef}
                  {...phone.data}
                />
              </label>
            )}
            <button>아이디 찾기</button>
          </form>

          <div className='result'>
            <p>{}</p>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
