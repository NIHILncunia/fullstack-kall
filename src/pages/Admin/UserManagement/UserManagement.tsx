import React, { useEffect, useMemo, useState } from 'react';
import { AdminLayout, AppLayout } from '@/layouts';
import { Heading2 } from '@/components/Content';
import { UserItem, UserManageBlock } from '@/components/Admin';
import { useUsers } from '@/hooks/trueQuery/users';
import { userItemStyle } from './style';

export function UserManagement() {
  const [ selectedItems, setSelectedItems, ] = useState<string[]>([]);
  const user = useUsers();
  const allUserIds = useMemo(() => {
    return user.map((item) => item.id);
  }, [ user, ]);

  useEffect(() => {
    localStorage.setItem('allUserIds', JSON.stringify(allUserIds));
  }, [ allUserIds, ]);

  return (
    <>
      <AppLayout title='회원 관리'>
        <AdminLayout pageId='admin-user-page'>
          <Heading2>회원 관리</Heading2>

          <UserManageBlock items={selectedItems} setItems={setSelectedItems} />

          <div css={userItemStyle}>
            <div className='list-header'>
              <p>선택</p>
              <p>이름</p>
              <p>아이디</p>
              <p>이메일</p>
            </div>
            {user?.map((item) => (
              <UserItem
                key={item.id}
                item={item}
                value={selectedItems}
                setValue={setSelectedItems}
              />
            ))}
          </div>

          <UserManageBlock items={selectedItems} setItems={setSelectedItems} />
        </AdminLayout>
      </AppLayout>
    </>
  );
}
