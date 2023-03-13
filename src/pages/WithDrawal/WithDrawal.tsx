import React, { useCallback, useState } from 'react';
import tw from 'twin.macro';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { AppLayout } from '@/layouts';
import { Heading2 } from '@/components/Content';
import { withDrawalFormStyle } from './style';
import { IUserDel } from '@/types/tables.types';
import { kallInstance } from '@/data/axios.data';

export function WithDrawal() {
  const [ text, setText, ] = useState('');

  const navi = useNavigate();
  const [ cookies, ] = useCookies([ 'id', ]);

  const onChangeText = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }, []);

  const onSubmitForm = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newData: IUserDel = {
      userId: cookies.id,
      text,
    };

    kallInstance.delete(`/users/${cookies.id}`, {
      data: newData,
    })
      .then((res) => {
        console.log(res);
        navi('/');
      });

    console.log(`[DELETE /users/${cookies.id}]`, newData);
  }, [ text, cookies, ]);

  return (
    <>
      <AppLayout title='회원탈퇴'>
        <div id='withdrawal-page' css={tw`py-[50px] !w-[600px] mx-auto text-black-base text-[1.2rem]`}>
          <Heading2>회원탈퇴</Heading2>
          <p css={tw`mb-[30px]`}>그동안 KALL을 이용해주셔서 감사합니다. 어떤 이유로 탈퇴를 하시는지 적어주시면 적극 수용하여 개선하도록 하겠습니다.</p>

          <form onSubmit={onSubmitForm} css={withDrawalFormStyle}>
            <label htmlFor='text'>
              <span>탈퇴사유</span>
              <textarea id='text' value={text} onChange={onChangeText} />
            </label>
            <div>
              <button>회원탈퇴</button>
              <button type='reset'>취소</button>
            </div>
          </form>
        </div>
      </AppLayout>
    </>
  );
}
