import React, { useCallback, useState } from 'react';
import { Heading2 } from '@/components/Content';
import { AdminLayout, AppLayout } from '@/layouts';
import { useDirects } from '@/hooks/trueQuery/direct';
import { DirectItem } from '@/components/Content/Admin';
import { buttonStyle, directListHeaderStyle, directListStyle } from './style';

export function AdminDirect() {
  const directs = useDirects();

  const [ items, setItems, ] = useState<number[]>([]);

  const onClickAllSelect = useCallback(() => {
    setItems(directs.map((item) => item.id));
  }, [ directs, ]);

  const onClickReset = useCallback(() => {
    if (items.length === 0) return;

    setItems([]);
  }, [ items, ]);

  const onClickSelectedDelete = useCallback(() => {
    if (items.length === 0) return;

    console.log('[DELETE /directs]', items);
  }, [ items, ]);

  return (
    <>
      <AppLayout title='1:1 문의 관리'>
        <AdminLayout pageId='admin-direct-page'>
          <Heading2>1:1 문의 관리</Heading2>

          <div css={buttonStyle}>
            <button onClick={onClickAllSelect}>전체 선택</button>
            <button onClick={onClickReset}>선택 취소</button>
            <button onClick={onClickSelectedDelete}>선택 삭제</button>
          </div>

          <div className='item-list' css={directListStyle}>
            <div className='list-header' css={directListHeaderStyle}>
              <div>선택</div>
              <div>분류</div>
              <div>제목</div>
              <div>작성자</div>
            </div>
            {directs.map((item) => (
              <DirectItem key={item.id} item={item} items={items} setItems={setItems} />
            ))}
          </div>
        </AdminLayout>
      </AppLayout>
    </>
  );
}
