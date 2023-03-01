import React, { useCallback, useRef, useState } from 'react';
import { useInput } from '@/hooks';
import { passCheckStyle } from './style';

interface IPassCheckProps {
  setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PassCheck({ setIsUser, }: IPassCheckProps) {
  const [ message, setMessage, ] = useState('');

  const passRef = useRef<HTMLInputElement>();
  const password = useInput(passRef, 'password');

  const onClickPassword = useCallback((event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    // 지금은 임시로 이렇게 하지만 비밀번호도 제대로 검증해야함.
    if (password.data.value === '') {
      setMessage('비밀번호를 입력해야 합니다.');
      return;
    }

    setIsUser(true);
  }, [ password, ]);

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
