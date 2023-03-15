import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { FaLock } from 'react-icons/fa';
import { IQuestion } from '@/types/tables.types';
import { reviewList } from './style';
import { setDate } from '@/utils/setDate';

interface IQuestionListProps {
  item: IQuestion;
}

export function QuestionList({ item, }: IQuestionListProps) {
  const [ { id, }, ] = useCookies([ 'id', ]);

  return (
    <>
      <div css={reviewList}>
        {id === item.userDTO?.userId && (
          <div className='link'>
            <Link to={`/mypage/question/${item.productQId}`}>{item.title}</Link>
          </div>
        )}
        {id !== item.userDTO?.userId && (
          <div className=''>
            <span>{item.title}</span>
            <FaLock />
          </div>
        )}
        <div>{item.userDTO?.userId}</div>
        <div>{setDate(item.date1)}</div>
      </div>
    </>
  );
}
