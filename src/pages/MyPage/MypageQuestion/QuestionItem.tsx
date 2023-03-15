import React, { useCallback } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { IQuestion } from '@/types/tables.types';
import { questionListContent } from './style';
import { setDate } from '@/utils/setDate';

interface IQuestionItemProps {
  item: IQuestion;
}

export function QuestionItem({ item, }: IQuestionItemProps) {
  const navi = useNavigate();

  const onClickLink = useCallback(() => {
    navi(`/mypage/question/${item.productQId}`);
  }, []);

  return (
    <>
      <div className='list-content' css={questionListContent}>
        <div onClick={onClickLink} role='link' tabIndex={0}>{item.title}</div>
        <div>{setDate(item.date1)}</div>
        <div>{item.comment ? <FaCheck /> : ''}</div>
      </div>
    </>
  );
}
