import React, { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router';
import { Heading2 } from '@/components/Content';
import { useQuestionByUserId } from '@/hooks/trueQuery/question';
import { AppLayout, MyPageLayout } from '@/layouts';
import { useDirectByUserId } from '@/hooks/trueQuery/direct';
import { QuestionList } from './QuestionList';
import { questionDirectbutton } from './style';

interface QueryString {
  current?: 'question' | 'direct';
}

export function MypageQuestion() {
  const location = useLocation();
  const navi = useNavigate();

  const [ list, setList, ] = useState<'question' | 'direct'>('question');

  const [ { id: userId, }, ] = useCookies([ 'id', ]);

  const myQuestion = useQuestionByUserId(userId);
  const myDirect = useDirectByUserId(userId, 'admin');

  useEffect(() => {
    const { current, } = queryString.parse(location.search) as QueryString;
    setList(current);
  }, [ location.search, ]);

  const onClickQuestion = useCallback(() => {
    setList('question');
    navi(`/mypage/question?current=question`);
  }, [ navi, ]);

  const onClickDirect = useCallback(() => {
    setList('direct');
    navi(`/mypage/question?current=direct`);
  }, [ navi, ]);

  return (
    <>
      <AppLayout title='문의 내역'>
        <MyPageLayout pageId='mypage-question-page'>
          <Heading2>문의 내역</Heading2>

          <div css={questionDirectbutton}>
            <button
              onClick={onClickQuestion}
              className={list === 'question' ? 'selected' : ''}
            >
              상품 문의 내역
            </button>
            <button
              onClick={onClickDirect}
              className={list === 'direct' ? 'selected' : ''}
            >
              1:1 문의 내역
            </button>
          </div>

          {list === 'question' && (
            <QuestionList items={myQuestion} list={list} />
          )}
          {list === 'direct' && (
            <QuestionList items={myDirect} list={list} />
          )}
        </MyPageLayout>
      </AppLayout>
    </>
  );
}
