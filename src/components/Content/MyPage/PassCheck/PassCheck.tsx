import React, { useCallback, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { parse } from 'path';
import { useInput } from '@/hooks';
import { passCheckStyle } from './style';
import { kallInstance } from '@/data/axios.data';
import { useAuthUserById } from '@/hooks/trueQuery/users';

interface IPassCheckProps {
  setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PassCheck({ setIsUser, }: IPassCheckProps) {
  const [ message, setMessage, ] = useState('');
  const [ { id, }, ] = useCookies([ 'id', ]);
  const user = useAuthUserById(id);

  const passRef = useRef<HTMLInputElement>();
  const password = useInput(passRef, 'password');

  const onClickPassword = useCallback((event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (password.data.value === '') {
      setMessage('비밀번호를 입력해야 합니다.');
      return;
    }

    const data = {
      userId: user.userId,
      password: password.data.value,
    };

    const token: string = JSON.parse(localStorage.getItem('token'));
    kallInstance.post('/users/passwordcheck', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log('res >> ', res);
        setIsUser(true);
      })
      .catch((error) => {
        console.error('error >> ', error);
      });
  }, [ password, id, user, ]);

  return (
    <>
      <div css={passCheckStyle}>
        <p>본인 확인을 위해 비밀번호를 입력하세요.</p>
        <input
          type='password'
          placeholder='7자리 이상'
          ref={passRef}
          {...password.data}
        />
        <p>{message}</p>
        <button onClick={onClickPassword}>본인확인</button>
      </div>
    </>
  );
}
