import moment from 'moment';
import React, { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import tw from 'twin.macro';
import { useUserById } from '@/hooks/trueQuery/users';
import { useDirectById, useDirects } from '@/hooks/trueQuery/direct';
import {
  articleBottomStyle, articleContentStyle, articleTopStyle, commentAdminStyle, goToBackStyle
} from './style';
import { useCategoryById } from '@/hooks/trueQuery/category';

export function DirectDetailPage() {
  const [ text, setText, ] = useState('');
  const [ label, setLabel, ] = useState('등록');
  const [ text2, setText2, ] = useState('');
  const [ label2, setLabel2, ] = useState('수정');
  const [ isClick, setIsClick, ] = useState(false);
  const [ isClick2, setIsClick2, ] = useState(false);

  const [ { role, }, ] = useCookies([ 'role', ]);
  const { id, } = useParams();
  const { pathname, } = useLocation();
  const editUrl = pathname.includes('admin')
    ? `/admin/direct/${id}/edit`
    : `/mypage/direct/${id}/edit`;
  const listUrl = pathname.includes('admin')
    ? `/admin/direct`
    : `/mypage/direct`;

  const directs = useDirects();
  const direct = useDirectById(Number(id));
  const userData = useUserById(direct.user_id, {
    enabled: 'id' in direct,
  });
  const category = useCategoryById(direct.category_id, {
    enabled: 'id' in direct,
  });

  console.log('comment >> ', direct.comment);

  const navi = useNavigate();

  const onClickEdit = useCallback(() => {
    navi(editUrl);
  }, [ editUrl, ]);

  const onCLickDelete = useCallback(() => {
    console.log(`[DELETE /directs/${id}]`);
  }, [ id, ]);

  const currentIndex = useMemo(() => {
    return directs.findIndex((item) => item.id === Number(id));
  }, [ directs, id, ]);

  const prevItem = directs[currentIndex - 1];
  const nextItem = directs[currentIndex + 1];

  const onChangeAddComment = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }, []);

  const onChangeUpdateComment = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText2(event.target.value);
  }, []);

  const onClickAddComment = useCallback(() => {
    setIsClick((prev) => !prev);

    if (isClick) {
      setLabel('등록');
      const newData = {
        comment: text,
      };
      console.log(`[PATCH /directs/${id}]`, newData);
    } else {
      setLabel('등록 완료');
    }
  }, [ isClick, text, ]);

  const onClickUpdateComment = useCallback(() => {
    setIsClick2((prev) => !prev);

    if (isClick2) {
      setLabel2('수정');
      const newData = {
        comment: text2,
      };
      console.log(`[PATCH /directs/${id}]`, newData);
    } else {
      setLabel2('수정 완료');
    }
  }, [ isClick2, text2, ]);

  return (
    <>
      <div className='go-to-back' css={goToBackStyle}>
        <Link to={listUrl}>목록으로</Link>
        <button onClick={onClickEdit}>수정</button>
        <button onClick={onCLickDelete}>삭제</button>
      </div>

      <div className='border border-solid border-black-200 divide-y divide-solid divide-black-200 mb-[30px]'>
        <div className='article-top' css={articleTopStyle}>
          <h3>{direct.title}</h3>
          <div>
            <p>
              <span>분류</span>
              <span>{category.category_name}</span>
            </p>
            <p>
              <span>작성자</span>
              <span>{userData.name}({userData.id})</span>
            </p>
            <p>
              <span>작성일</span>
              <span>{moment(direct.date1).format('YYYY-MM-DD HH:mm:ss')}</span>
            </p>
          </div>
        </div>
        <div className='article-content' css={articleContentStyle}>{direct.content}</div>
      </div>

      <div className='article-comment'>
        <div css={tw`font-[900] text-[1.5rem] mb-[10px]`}>관리자 답변</div>
        {
          direct.comment
            ? (
              role === 'admin'
                ? (
                  <div css={commentAdminStyle}>
                    <textarea
                      value={text}
                      onChange={onChangeAddComment}
                      disabled={isClick === false}
                      className={isClick ? 'edit' : ''}
                    />
                    <button onClick={onClickAddComment}>{label}</button>
                  </div>
                )
                : (
                  <div css={tw`p-[10px] border border-black-200 bg-black-50 mb-[30px]`}>
                    {direct.comment}
                  </div>
                )
            )
            : (
              role === 'admin'
                ? (
                  <div>
                    <textarea
                      value={text2}
                      onChange={onChangeUpdateComment}
                      disabled={isClick2 === false}
                      className={isClick2 ? 'edit' : ''}
                    />
                    <button onClick={onClickUpdateComment}>{label2}</button>
                  </div>
                )
                : ''
            )
        }
      </div>

      <div className='article-bottom' css={articleBottomStyle}>
        <div className='prev-link'>
          {prevItem && (
            <Link to={`${listUrl}/${prevItem.id}`}>
              <FaArrowLeft />
              {prevItem.title}
            </Link>
          )}
        </div>
        <div className='next-link'>
          {nextItem && (
            <Link to={`${listUrl}/${nextItem.id}`}>
              {nextItem.title}
              <FaArrowRight />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
