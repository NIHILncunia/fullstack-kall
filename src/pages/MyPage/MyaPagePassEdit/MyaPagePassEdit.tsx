import React, {
  ChangeEvent, useCallback, useRef, useState
} from 'react';
import { useCookies } from 'react-cookie';
import tw from 'twin.macro';
import { useNavigate } from 'react-router';
import { AppLayout, MyPageLayout } from '@/layouts';
import { PassCheck } from '@/components/Content/MyPage';
import { Heading2 } from '@/components/Content';
import { useInput } from '@/hooks';
import { passEditFormStyle } from './style';
import { kallInstance } from '@/data/axios.data';
import { useUserById } from '@/hooks/trueQuery/users';
import { IUser } from '@/types/tables.types';

export function MyaPagePassEdit() {
  const [ isUser, setIsUser, ] = useState(true);
  const [ cookies, ] = useCookies([ 'id', ]);
  const user = useUserById(cookies.id);
  const navi = useNavigate();

  const currentPassRef = useRef<HTMLInputElement>();
  const newPassRef = useRef<HTMLInputElement>();
  const newPassCheckRef = useRef<HTMLInputElement>();

  const currentPass = useInput(currentPassRef, 'currentPass');
  const newPass = useInput(newPassRef, 'newPass');
  const newPassCheck = useInput(newPassCheckRef, 'newPassCheck');

  const currentPassError = user.password !== currentPass.data.value;
  const newPassError = newPass.data.value !== newPassCheck.data.value;
  const notChangeError = user.password === newPass.data.value;

  const onChangePass = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    currentPass.setValue(event.target.value);
  }, [ user, currentPass, ]);

  const onChangeNewPass = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    newPass.setValue(event.target.value);
  }, [ newPass, newPassCheck, ]);

  const onChangeNewPassCheck = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    newPassCheck.setValue(event.target.value);
  }, [ newPass, newPassCheck, ]);

  const onSubmitForm = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (notChangeError === false) {
      const putData: IUser = {
        userId: cookies.id,
        password: newPass.data.value,
      };

      kallInstance.put(`/users/password/${user.userId}`, putData)
        .then((res) => {
          console.log('바뀜');
        })
        .catch((error) => {
          navi('/mypage/main');
        });
    }
  }, [ newPass, user, cookies, ]);

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
              {currentPassError && (
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
              {newPassError && (
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
