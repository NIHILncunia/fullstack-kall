import React, {
  FormEvent, useCallback, useRef, useState
} from 'react';
import { Link } from 'react-router-dom';
import { Global } from '@emotion/react';
import tw, { css } from 'twin.macro';
import { AppLayout } from '@/layouts';
import {
  addressInputStyle,
  agreementStyle,
  birthdayStyle,
  chooseInputStyle,
  formStyle, inputsStyle, legendStyle, requiredInputStyle, rootStyle, signUpButtonStyle, signUpPageStyle
} from './style';
import { useCheckbox, useInput } from '@/hooks';
import { rootCheckBoxData } from '@/data/checkbox.data';
import { RequireMark } from '@/components/Content';

export function SignUp() {
  const nameRef = useRef<HTMLInputElement>();
  const idRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const passwordCheckRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();

  const name = useInput(nameRef, 'name');
  const id = useInput(idRef, 'user-id');
  const password = useInput(passwordRef, 'password');
  const passwordCheck = useInput(passwordCheckRef, 'password-check');
  const phone = useInput(phoneRef, 'phone');
  const email = useInput(emailRef, 'email');

  const [ zipCode, setZipCode, ] = useState('');
  const [ address, setAddress, ] = useState('');

  const address2Ref = useRef<HTMLInputElement>();
  const address2 = useInput(address2Ref, 'address2');

  const birthdayRef = useRef<HTMLInputElement>();
  const birthday = useInput(birthdayRef, 'birthday');

  const root = useCheckbox();
  const agree = useCheckbox();

  const onSubmitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('회원가입 정보 >> ', {
      user_id: id.value,
      name: name.value,
      password: password.value,
      phone_nb: phone.value,
      email: email.value,
      birthday: birthday.value,
      root: root.items.toString(),
      eventagree: agree.items.includes('eventAgree') ? 'o' : 'x',
    });

    console.log(`${id.value}의 주소 정보 >> `, {
      zipCode,
      address,
      address2: address2.value,
    });
  }, [ id, name, password, phone, email, birthday, root.items, agree.items, ]);

  return (
    <>
      <Global
        styles={css`
          main {
            ${tw` !w-[600px] `}
          }
        `}
      />
      <AppLayout title='회원가입' url='/signup'>
        <div id='signup-page' css={signUpPageStyle}>
          <form css={formStyle} onSubmit={onSubmitForm}>
            <fieldset css={requiredInputStyle}>
              <legend css={legendStyle}>필수입력 사항</legend>
              <div css={inputsStyle}>
                <label htmlFor='name'>
                  <span>이름 <RequireMark /></span>
                  <input
                    type='text'
                    required
                    placeholder='이름을 입력해주세요'
                    ref={nameRef}
                    {...name}
                  />
                </label>
                <label htmlFor='user-id'>
                  <span>아이디 <RequireMark /></span>
                  <input
                    type='text'
                    required
                    placeholder='사용하실 아이디를 입력해주세요'
                    ref={idRef}
                    {...id}
                  />
                </label>
                <label htmlFor='password'>
                  <span>비밀번호 <RequireMark /></span>
                  <input
                    type='password'
                    required
                    placeholder='최소 7자리 이상'
                    ref={passwordRef}
                    {...password}
                  />
                </label>
                <label htmlFor='password-check'>
                  <span>비밀번호 확인 <RequireMark /></span>
                  <input
                    type='password'
                    required
                    placeholder='최소 7자리 이상'
                    ref={passwordCheckRef}
                    {...passwordCheck}
                  />
                </label>
                <label htmlFor='phone'>
                  <span>전화번호 <RequireMark /></span>
                  <input
                    type='text'
                    required
                    placeholder='-를 빼고 입력하세요'
                    ref={phoneRef}
                    {...phone}
                  />
                </label>
                <label htmlFor='email'>
                  <span>이메일 <RequireMark /></span>
                  <input
                    type='email'
                    required
                    placeholder='ex) example@example.com'
                    ref={emailRef}
                    {...email}
                  />
                </label>
              </div>
              <div css={addressInputStyle}>
                <span>주소 <RequireMark /></span>
                <div>
                  <input className='zipcode' type='text' readOnly required placeholder='우편 번호' />
                  <button>우편번호 찾기</button>
                </div>
                <input className='address' type='text' readOnly required placeholder='주소' />
                <input
                  className='address'
                  type='text'
                  required
                  placeholder='상세 주소'
                  ref={address2Ref}
                  {...address2}
                />
              </div>
            </fieldset>
            <fieldset css={chooseInputStyle}>
              <legend css={legendStyle}>선택입력 사항</legend>
              <label htmlFor='birthday' css={birthdayStyle}>
                <span>생년월일</span>
                <input
                  type='date'
                  ref={birthdayRef}
                  {...birthday}
                />
              </label>
              <div css={rootStyle}>
                <span>방문 경로</span>
                <div>
                  {rootCheckBoxData.map((item) => (
                    <label key={item.id} htmlFor={item.value}>
                      <input
                        type='checkbox'
                        name='root'
                        id={item.value}
                        value={item.value}
                        onChange={root.onChange}
                        hidden
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

            </fieldset>
            <fieldset css={agreementStyle}>
              <legend css={legendStyle}>약관동의</legend>
              <div>
                <label htmlFor='age-agree'>
                  <input
                    type='checkbox'
                    name='agree'
                    id='age-agree'
                    value='ageAgree'
                    required
                    onChange={agree.onChange}
                  />
                  <span>만 14세 이상입니다. (필수) <RequireMark /></span>
                </label>
                <label htmlFor='using-agree'>
                  <input
                    type='checkbox'
                    name='agree'
                    id='using-agree'
                    value='usingAgree'
                    required
                    onChange={agree.onChange}
                  />
                  <span>이용약관에 동의합니다. (필수) <RequireMark /></span>
                  <Link to='/agreement' target='_blank'>[확인]</Link>
                </label>
                <label htmlFor='privacy-agree'>
                  <input
                    type='checkbox'
                    name='agree'
                    id='privacy-agree'
                    value='privacyAgree'
                    required
                    onChange={agree.onChange}
                  />
                  <span>개인정보처리방침에 동의합니다. (필수) <RequireMark /></span>
                  <Link to='/privacy' target='_blank'>[확인]</Link>
                </label>
                <label htmlFor='event-agree'>
                  <input
                    type='checkbox'
                    name='agree'
                    id='event-agree'
                    value='eventAgree'
                    onChange={agree.onChange}
                  />
                  <span>이벤트, 쿠폰,특가알림 메일 및 SMS 등 수신 (선택)</span>
                </label>
              </div>
            </fieldset>
            <button css={signUpButtonStyle}>회원가입하기</button>
          </form>
        </div>
      </AppLayout>
    </>
  );
}
