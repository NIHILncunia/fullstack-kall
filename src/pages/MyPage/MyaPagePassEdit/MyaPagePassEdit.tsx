import React, {
  ChangeEvent, useCallback, useRef, useState
} from 'react';
import { useCookies } from 'react-cookie';
import tw from 'twin.macro';
import { AppLayout, MyPageLayout } from '@/layouts';
import { PassCheck } from '@/components/Content/MyPage';
import { Heading2 } from '@/components/Content';
import { useInput } from '@/hooks';
import { passEditFormStyle } from './style';
import { useAuthUserById, useUserById } from '@/hooks/trueQuery/users';
import { kallInstance } from '@/data/axios.data';

export function MyaPagePassEdit() {
  const [ isPassError, setIsPassError, ] = useState(false);
  const [ isNewPassError, setIsNewPassError, ] = useState(false);
  const [ isUser, setIsUser, ] = useState(true);
  const [ cookies, ] = useCookies([ 'id', ]);
  const user = useAuthUserById(cookies.id);

  const currentPassRef = useRef<HTMLInputElement>();
  const newPassRef = useRef<HTMLInputElement>();
  const newPassCheckRef = useRef<HTMLInputElement>();

  const currentPass = useInput(currentPassRef, 'currentPass');
  const newPass = useInput(newPassRef, 'newPass');
  const newPassCheck = useInput(newPassCheckRef, 'newPassCheck');

  const onChangePass = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (user?.password !== event.target.value) {
      setIsPassError(true);
    } else {
      setIsPassError(false);
    }

    currentPass.setValue(event.target.value);
  }, [ user, currentPass, ]);

  const onChangeNewPass = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== newPassCheck.data.value) {
      setIsNewPassError(true);
    } else {
      setIsNewPassError(false);
    }

    newPass.setValue(event.target.value);
  }, [ newPass, newPassCheck, ]);

  const onChangeNewPassCheck = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== newPass.data.value) {
      setIsNewPassError(true);
    } else {
      setIsNewPassError(false);
    }

    newPassCheck.setValue(event.target.value);
  }, [ newPass, newPassCheck, ]);

  const onSubmitForm = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const equalError = newPass.data.value === user?.password;
    console.log('equalError >> ', equalError);

    if (equalError === false) {
      // [PUT /users/{id}, {새로운 비밀번호 문자열}]
      // 요청을 보내면 백엔드에서 새롭게 암호화 해서 성공이면 ok 등의 사인을 보내줌.
      const putData = {
        password: newPass.data.value,
      };

      kallInstance.put(`/users/password/${user.userId}`, putData)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
      console.log('백엔드로 데이터 전송 >> ', putData);
    }
  }, [ newPass, user, ]);

  const onClickReset = useCallback(() => {
    currentPass.setValue('');
    newPass.setValue('');
    newPassCheck.setValue('');
  }, [ currentPass, newPass, newPassCheck, ]);

  return (
    <>
      <AppLayout title='비밀번호 변경'>
        <MyPageLayout pageId='password-edit-page'>
          <Heading2>비밀번호 변경</Heading2>

          {isUser === false && (
            <PassCheck setIsUser={setIsUser} />
          )}

          {isUser && (
            <form onSubmit={onSubmitForm} css={passEditFormStyle}>
              <label htmlFor='currentPass'>
                <span>현재 비밀번호</span>
                <input
                  type='password'
                  ref={currentPassRef}
                  placeholder='7자리 이상'
                  required
                  {...currentPass.data}
                  onChange={onChangePass}
                />
              </label>
              {isPassError && (
                <p css={tw`text-red-500 font-[900] mt-[5px]`}>
                  현재 비밀번호와 일치하지 않습니다.
                </p>
              )}
              <label htmlFor='newPass' css={tw`mt-[30px]`}>
                <span>새로운 비밀번호</span>
                <input
                  type='password'
                  ref={newPassRef}
                  placeholder='7자리 이상'
                  required
                  {...newPass.data}
                  onChange={onChangeNewPass}
                />
              </label>
              <label htmlFor='newPassCheck'>
                <span>새로운 비밀번호 확인</span>
                <input
                  type='password'
                  ref={newPassCheckRef}
                  placeholder='7자리 이상'
                  required
                  {...newPassCheck.data}
                  onChange={onChangeNewPassCheck}
                />
              </label>
              {isNewPassError && (
                <p css={tw`text-red-500 font-[900] mt-[5px]`}>
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
              <div>
                <button>비밀번호 변경</button>
                <button type='reset' onClick={onClickReset}>취소</button>
              </div>
            </form>
          )}
        </MyPageLayout>
      </AppLayout>
    </>
  );
}
