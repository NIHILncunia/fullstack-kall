import React, {
  FormEvent, useCallback, useEffect, useRef, useState
} from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import tw from 'twin.macro';
import { useQueryClient } from 'react-query';
import { useInput } from '@/hooks';
import { userInfoEditStyle } from './style';
import { useUpdateUserInfo, useUserById } from '@/hooks/trueQuery/users';
import { IUser } from '@/types/tables.types';

export function UserInfoEditForm() {
  const [ emailError, setEmailError, ] = useState(false);
  const [ phoneError, setPhoneError, ] = useState(false);

  const [ cookies, ] = useCookies([ 'id', ]);
  const user = useUserById(cookies.id);
  const queryClient = useQueryClient();
  const navi = useNavigate();
  const updateUserInfo = useUpdateUserInfo(user.userId);

  const idRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();

  const id = useInput(idRef, 'id');
  const name = useInput(nameRef, 'name');
  const email = useInput(emailRef, 'email');
  const phone = useInput(phoneRef, 'phone');

  useEffect(() => {
    if ('userId' in user) {
      id.setValue(user.userId);
      name.setValue(user.name);
      email.setValue(user.email);
      phone.setValue(user.phoneNb);
    }
  }, [ user, ]);

  const onSubmitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const editInfo: IUser = {
      userId: id.data.value,
      name: name.data.value,
      email: email.data.value,
      phoneNb: phone.data.value,
    };

    updateUserInfo.mutate(editInfo, {
      onSuccess: () => {
        queryClient.refetchQueries([ 'getAuthUserById', user.userId, ]);
        navi('/mypage/main');
      },
      onError: (error) => {
        console.error(error);
      },
    });

    console.log(`[PUT /users/phoneoremail/${user.userId}]`, editInfo);
  }, [ id, name, email, phone, ]);

  const onChangeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    email.setValue(event.target.value);

    if (user.email === event.target.value) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [ email, user, ]);

  const onChangePhone = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    phone.setValue(event.target.value);

    if (user.phoneNb === event.target.value) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  }, [ phone, user, ]);

  const onClickCancel = useCallback(() => {
    navi('/mypage/main');
  }, []);

  return (
    <>
      <form onSubmit={onSubmitForm} css={userInfoEditStyle}>
        <label htmlFor='id'>
          <span>아이디</span>
          <input
            type='text'
            disabled
            readOnly
            ref={idRef}
            {...id.data}
          />
        </label>
        <label htmlFor='name'>
          <span>이름</span>
          <input
            type='text'
            disabled
            readOnly
            ref={nameRef}
            {...name.data}
          />
        </label>
        <label htmlFor='email'>
          <span>이메일</span>
          <input type='email' ref={emailRef} {...email.data} onChange={onChangeEmail} />
        </label>
        <label htmlFor='phone'>
          <span>휴대폰 번호</span>
          <input type='text' ref={phoneRef} {...phone.data} onChange={onChangePhone} />
        </label>
        <p css={tw`mt-[5px]`}>아이디와 이름은 수정 할 수 없습니다.</p>
        <p>{emailError && ('기존의 이메일과 같습니다.')}</p>
        <p>{phoneError && ('기존의 휴대폰 번호와 같습니다.')}</p>
        <div>
          <button>개인정보 수정</button>
          <button type='reset' onClick={onClickCancel}>취소</button>
        </div>
      </form>
    </>
  );
}
