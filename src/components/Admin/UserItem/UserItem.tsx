import React, { useCallback, useState } from 'react';
import tw from 'twin.macro';
import { useNavigate } from 'react-router';
import { IUser } from '@/types/tables.types';
import { listContentStyle, listDetailStyle } from './style';
import { setDate } from '@/utils/setDate';

interface IUserItemProps {
  item: IUser;
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
}

export function UserItem({ item, value, setValue, }: IUserItemProps) {
  const [ isOpen, setIsOpen, ] = useState(false);

  const navi = useNavigate();

  const onChangeUser = useCallback((id: string) => {
    setValue((prev) => (
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [ ...prev, id, ]
    ));
  }, []);

  const onClickOpen = useCallback(() => {
    setIsOpen((prev) => (!prev));
  }, []);

  const onClickEdit = useCallback((id: string) => {
    navi(`/admin/users/edit?id=${id}`);
  }, []);

  return (
    <>
      <div className='list-content' css={listContentStyle}>
        <p>
          <label htmlFor={item.userId}>
            <input
              type='checkbox'
              name='user'
              id={item.userId}
              value={item.userId}
              onChange={() => onChangeUser(item.userId)}
              checked={value.includes(item.userId)}
              css={tw`w-[30px] h-[30px] block`}
            />
          </label>
        </p>
        <p>{item.name}</p>
        <p onClick={onClickOpen}>{item.userId}</p>
        <p>{item.email}</p>
      </div>
      {isOpen && (
        <div className='list-detail' css={[ listDetailStyle, isOpen && tw`mb-[30px]`, ]}>
          <div>
            <p>핸드폰 번호</p>
            <p>생일</p>
            <p>권한</p>
            <p>마일리지</p>
            <p>가입일</p>
            <p>상태</p>
          </div>
          <div>
            <p>{item.phoneNb}</p>
            <p>{item.birthday}</p>
            <p>{item.role === 'user' ? '유저' : '관리자'}</p>
            <p>{item.mileage}</p>
            <p>{setDate(item.date)}</p>
            <p>{item.status}</p>
          </div>
          <div css={tw`flex justify-end items-center`}>
            <button
              onClick={() => onClickEdit(item.userId)}
              css={tw`p-[20px_10px] w-[200px] bg-point-base hover:text-white hover:bg-point-h-base`}
            >
              수정
            </button>
          </div>
        </div>
      )}
    </>
  );
}
