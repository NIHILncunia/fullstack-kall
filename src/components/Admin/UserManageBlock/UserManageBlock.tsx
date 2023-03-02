import React, { useCallback } from 'react';
import { useDeleteUsers } from '@/hooks/trueQuery/users';
import { buttonBlockStyle } from './style';

interface IUserManageBlockProps {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export function UserManageBlock({ items, setItems, }: IUserManageBlockProps) {
  const deleteUsers = useDeleteUsers(items);
  const deleteAllUsers = useDeleteUsers(
    JSON.parse(localStorage.getItem('allUserIds'))
  );
  const onClickReset = useCallback(() => {
    setItems([]);
  }, []);

  const onDeleteAllData = useCallback(() => {
    deleteAllUsers();
  }, []);

  const onDeleteSelectData = useCallback(() => {
    if (items.length !== 0) {
      deleteUsers();
    }
  }, []);

  return (
    <>
      <div css={buttonBlockStyle}>
        <button onClick={onClickReset}>선택 취소</button>
        <button onClick={onDeleteAllData}>전체 삭제</button>
        <button onClick={onDeleteSelectData}>선택 삭제</button>
      </div>
    </>
  );
}
