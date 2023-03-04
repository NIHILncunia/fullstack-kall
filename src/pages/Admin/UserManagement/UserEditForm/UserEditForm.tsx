import React, {
  useCallback, useEffect, useRef
} from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import tw from 'twin.macro';
import { AdminLayout, AppLayout } from '@/layouts';
import { Heading2 } from '@/components/Content';
import { useInput } from '@/hooks';
import { useUpdateUser, useUserById } from '@/hooks/trueQuery/users';
import { IUser } from '@/types/tables.types';
import { userEditFormStyle } from './style';

export function UserEditForm() {
  const location = useLocation();
  const qString = queryString.parse(location.search);
  const user = useUserById(qString.id as string);

  const { mutate: updateUser, message, } = useUpdateUser(user.id);

  const idRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const birthdayRef = useRef<HTMLInputElement>();
  const roleRef = useRef<HTMLInputElement>();
  const statusRef = useRef<HTMLInputElement>();

  const id = useInput(idRef, 'id');
  const name = useInput(nameRef, 'name');
  const email = useInput(emailRef, 'email');
  const phone = useInput(phoneRef, 'phone');
  const birthday = useInput(birthdayRef, 'birthday');
  const role = useInput(roleRef, 'role');
  const status = useInput(statusRef, 'status');

  console.log(user);

  useEffect(() => {
    if ('id' in user) {
      id.setValue(user.id);
      name.setValue(user.name);
      email.setValue(user.email);
      phone.setValue(user.phone_nb);
      birthday.setValue(user.birthday);
      role.setValue(user.role);
      status.setValue(user.status);
    }
  }, [ user, ]);

  const onSubmitForm = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newData: IUser = {
      id: id.data.value,
      name: name.data.value,
      email: email.data.value,
      phone_nb: phone.data.value,
      birthday: birthday.data.value,
      role: role.data.value as ('user' | 'admin'),
      status: role.data.value as ('활동계정' | '비활동계정'),
    };

    console.log('유저 데이터 변경 >> ', newData);

    updateUser(newData);

    console.log(message);
  }, [ id, name, email, phone, birthday, role, ]);

  const onClickDelete = useCallback(() => {
    const newData = {
      user_id: id.data.value,
      text: '관리자에 의한 강제 탈퇴',
    };

    console.log('[POST /withdrawal, newData]', newData);
  }, [ id, ]);

  return (
    <>
      <AppLayout title={`${qString.id} 정보 수정`}>
        <AdminLayout pageId='admin-user-edit-page'>
          <Heading2>{qString.id} 정보 수정</Heading2>
          <form onSubmit={onSubmitForm} css={userEditFormStyle}>
            <label htmlFor='id'>
              <span>아이디</span>
              <input type='text' ref={idRef} {...id.data} />
            </label>
            <label htmlFor='name'>
              <span>이름</span>
              <input type='text' ref={nameRef} {...name.data} />
            </label>
            <label htmlFor='email'>
              <span>이메일</span>
              <input type='email' ref={emailRef} {...email.data} />
            </label>
            <label htmlFor='phone'>
              <span>핸드폰 번호</span>
              <input type='text' ref={phoneRef} {...phone.data} />
            </label>
            <label htmlFor='birthday'>
              <span>생일</span>
              <input type='date' ref={birthdayRef} {...birthday.data} />
            </label>
            <label htmlFor='role'>
              <span>권한</span>
              <input type='text' list='role-list' ref={roleRef} {...role.data} />
              <datalist id='role-list'>
                <option value='user'>user</option>
                <option value='admin'>admin</option>
              </datalist>
            </label>
            <label htmlFor='status'>
              <span>상태</span>
              <input type='text' list='staus-list' ref={statusRef} {...status.data} />
              <datalist id='status-list'>
                <option value='활동회원'>활동회원</option>
                <option value='비활동회원'>비활동회원</option>
                <option value='탈퇴'>탈퇴</option>
              </datalist>
            </label>
            {message && <p css={tw`mt-[5px] font-[900]`}>{message}</p>}
            <div>
              <button>수정</button>
              <button type='button' onClick={onClickDelete}>삭제</button>
            </div>
          </form>
        </AdminLayout>
      </AppLayout>
    </>
  );
}
