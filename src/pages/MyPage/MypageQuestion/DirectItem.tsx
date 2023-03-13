import React, { useCallback } from 'react';
import moment from 'moment';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { IDirect } from '@/types/tables.types';
import { useCategoryById } from '@/hooks/trueQuery/category';
import { directListContent } from './style';

interface IDirectItemProps {
  item: IDirect;
}

export function DirectItem({ item, }: IDirectItemProps) {
  const category = useCategoryById(item.categoryDTO.categoryId).categoryName;

  const navi = useNavigate();

  const onClickLink = useCallback(() => {
    navi(`/mypage/direct/${item.usQId}`);
  }, []);

  return (
    <>
      <div className='list-content' css={directListContent}>
        <div onClick={onClickLink} role='link' tabIndex={0}>{item.title}</div>
        <div>{category}</div>
        <div>{moment(item.date1).format('YYYY-MM-DD HH:mm:ss')}</div>
        <div>{item.comment ? <FaCheck /> : ''}</div>
      </div>
    </>
  );
}
