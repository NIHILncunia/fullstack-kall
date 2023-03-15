import React, { useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Heading2 } from '@/components/Content';
import { AdminLayout, AppLayout } from '@/layouts';
import { useDeleteQuestions, useQuestions } from '@/hooks/trueQuery/question';
import { QuestionItem } from '@/components/Content/Admin';
import { listHeaderStyle, listStyle, noticeButtonStyle } from './style';

export function AdminQuestion() {
  const [ items, setItems, ] = useState<number[]>([]);
  const [ { role, }, ] = useCookies([ 'id', 'role', ]);

  const questions = useQuestions(role);
  const deleteQuestions = useDeleteQuestions();

  const onClickAllCheck = useCallback(() => {
    setItems(questions.map((item) => item.productQId));
  }, [ questions, ]);

  const onClickReset = useCallback(() => {
    setItems([]);
  }, []);

  const onClickCheckDelete = useCallback(() => {
    // 선택 삭제의 경우 아이디 배열을 전달한다.
    deleteQuestions.mutate(items);
    console.log('[DELETE /admin/questions]', items);
  }, [ items, ]);

  return (
    <>
      <AppLayout title='문의 관리'>
        <AdminLayout pageId='admin-question-page'>
          <Heading2>문의 관리</Heading2>

          <div css={noticeButtonStyle}>
            <button onClick={onClickAllCheck}>전체 선택</button>
            <button onClick={onClickReset}>선택 취소</button>
            <button onClick={onClickCheckDelete}>선택 삭제</button>
          </div>

          <div css={listStyle}>
            <div className='list-header' css={listHeaderStyle}>
              <div>선택</div>
              <div>제목</div>
              <div>작성자</div>
              <div>작성일</div>
            </div>
            {questions.map((item) => (
              <QuestionItem
                key={item.productQId}
                item={item}
                items={items}
                setItems={setItems}
              />
            ))}
          </div>
        </AdminLayout>
      </AppLayout>
    </>
  );
}
