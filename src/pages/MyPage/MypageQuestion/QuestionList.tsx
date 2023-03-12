import React from 'react';
import { IDirect, IQuestion } from '@/types/tables.types';
import { QuestionItem } from './QuestionItem';
import { DirectItem } from './DirectItem';
import { listHeader, questionList } from './style';

interface IQuestionListProps {
  items: IQuestion[] | IDirect[];
  list: 'question' | 'direct';
}

export function QuestionList({ items, list, }: IQuestionListProps) {
  return (
    <>
      <div className='item-list' css={questionList}>
        <div className='list-header' css={listHeader}>
          <div>제목</div>
          {list !== 'question' && (<div>분류</div>)}
          <div>작성일</div>
          <div>답변상태</div>
        </div>
        {list === 'question' && (items as IQuestion[]).map((item) => (
          <QuestionItem key={item.id} item={item} />
        ))}
        {list === 'direct' && (items as IDirect[]).map((item) => (
          <DirectItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
