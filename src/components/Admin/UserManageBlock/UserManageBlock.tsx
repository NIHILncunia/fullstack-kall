import React, { useCallback } from 'react';
import { useDeleteUsers } from '@/hooks/trueQuery/users';
import { buttonBlockStyle } from './style';

interface IUserManageBlockProps {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export function UserManageBlock({ items, setItems, }: IUserManageBlockProps) {
  const deleteUsers = useDeleteUsers();
  const deleteAllUsers = useDeleteUsers();

  const onClickReset = useCallback(() => {
    setItems([]);
  }, []);

  const onClickAllSelect = useCallback(() => {
    setItems(JSON.parse(localStorage.getItem('allUserIds')) as string[]);
  }, []);

  const onDeleteAllData = useCallback(() => {
    const userDelData = JSON.parse(localStorage.getItem('allUserIds')) as string[];
    deleteAllUsers.mutate(userDelData);
  }, []);

  const onDeleteSelectData = useCallback(() => {
    if (items.length !== 0) {
      deleteUsers.mutate(items);
    }
  }, [ items, ]);

  return (
    <>
      <div css={buttonBlockStyle}>
        <button onClick={onClickAllSelect}>전체 선택</button>
        <button onClick={onClickReset}>선택 취소</button>
        <button onClick={onDeleteAllData}>전체 삭제</button>
        <button onClick={onDeleteSelectData}>선택 삭제</button>
      </div>
    </>
  );
}
