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
      onSuccess: (res) => {
        console.log(res);
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
          <span>?????????</span>
          <input
            type='text'
            disabled
            readOnly
            ref={idRef}
            {...id.data}
          />
        </label>
        <label htmlFor='name'>
          <span>??????</span>
          <input
            type='text'
            disabled
            readOnly
            ref={nameRef}
            {...name.data}
          />
        </label>
        <label htmlFor='email'>
          <span>?????????</span>
          <input type='email' ref={emailRef} {...email.data} onChange={onChangeEmail} />
        </label>
        <label htmlFor='phone'>
          <span>????????? ??????</span>
          <input type='text' ref={phoneRef} {...phone.data} onChange={onChangePhone} />
        </label>
        <p css={tw`mt-[5px]`}>???????????? ????????? ?????? ??? ??? ????????????.</p>
        <p>{emailError && ('????????? ???????????? ????????????.')}</p>
        <p>{phoneError && ('????????? ????????? ????????? ????????????.')}</p>
        <div>
          <button>???????????? ??????</button>
          <button type='reset' onClick={onClickCancel}>??????</button>
        </div>
      </form>
    </>
  );
}
