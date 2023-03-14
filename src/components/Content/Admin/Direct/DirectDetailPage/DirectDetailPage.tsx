import moment from 'moment';
import React, { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import tw from 'twin.macro';
import { useQueryClient } from 'react-query';
import { useUserById } from '@/hooks/trueQuery/users';
import {
  useDeleteDirect, useDirectById, useDirectByUserId, useDirects
} from '@/hooks/trueQuery/direct';
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

  const qc = useQueryClient();

  const { pathname, } = useLocation();
  const cond = pathname.includes('admin');

  const deleteDirect = useDeleteDirect();

  const [ { id: userId, role, }, ] = useCookies([ 'id', 'role', ]);
  const { id, } = useParams();
  const editUrl = cond
    ? `/admin/direct/${id}/edit`
    : `/mypage/direct/${id}/edit`;
  const listUrl = cond
    ? `/admin/direct`
    : `/mypage/direct`;

  const directs = useDirects('admin');
  const myDirect = useDirectByUserId(userId, 'admin');
  const direct = useDirectById(Number(id), 'admin');
  const userData = useUserById(direct.userDTO.userId, {
    enabled: 'usQId' in direct,
  });
  const category = useCategoryById(direct.categoryDTO.categoryId, {
    enabled: 'usQId' in direct,
  });

  const navi = useNavigate();

  const onClickEdit = useCallback(() => {
    navi(editUrl);
  }, [ editUrl, ]);

  const onCLickDelete = useCallback(() => {
    deleteDirect.mutate({ directId: Number(id), role, }, {
      onSuccess() {
        qc.refetchQueries('getDirects');
      },
    });

    if (role === 'admin') {
      console.log(`[DELETE /admin/directs/${id}]`);
    } else {
      console.log(`[DELETE /directs/${id}]`);
    }

    const url = role === 'admin'
      ? '/admin/direct'
      : '/mypage/question?current=direct';

    navi(url);
  }, [ id, ]);

  const currentIndex = useMemo(() => {
    return cond
      ? directs.findIndex((item) => item.usQId === Number(id))
      : myDirect.findIndex((item) => item.usQId === Number(id));
  }, [ directs, myDirect, id, ]);

  const prevItem = cond ? directs[currentIndex - 1] : myDirect[currentIndex - 1];
  const nextItem = cond ? directs[currentIndex + 1] : myDirect[currentIndex + 1];

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

  const backLink = cond
    ? `/admin/direct`
    : `/mypage/question?current=direct`;

  return (
    <>
      <div className='go-to-back' css={goToBackStyle}>
        <Link to={backLink}>목록으로</Link>
        <button onClick={onClickEdit}>수정</button>
        <button onClick={onCLickDelete}>삭제</button>
      </div>

      <div className='border border-solid border-black-200 divide-y divide-solid divide-black-200 mb-[30px]'>
        <div className='article-top' css={articleTopStyle}>
          <h3>{direct.title}</h3>
          <div>
            <p>
              <span>분류</span>
              <span>{category.categoryName}</span>
            </p>
            <p>
              <span>작성자</span>
              <span>{userData.name}({userData.userId})</span>
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
        {
          direct.comment
            ? (
              role === 'admin'
                ? (
                  <>
                    <div css={tw`font-[900] text-[1.5rem] mb-[10px]`}>관리자 답변</div>
                    <div css={commentAdminStyle}>
                      <textarea
                        value={text}
                        onChange={onChangeAddComment}
                        disabled={isClick === false}
                        className={isClick ? 'edit' : ''}
                      />
                      <button onClick={onClickAddComment}>{label}</button>
                    </div>
                  </>
                )
                : (
                  <>
                    <div css={tw`font-[900] text-[1.5rem] mb-[10px]`}>관리자 답변</div>
                    <div css={tw`p-[10px] border border-black-200 bg-black-50 mb-[10px]`}>
                      {direct.comment}
                    </div>
                    <p css={tw`text-right font-[900] text-[1.4rem] mb-[30px]`}>{direct.date2}</p>
                  </>
                )
            )
            : (
              role === 'admin'
                ? (
                  <>
                    <div css={tw`font-[900] text-[1.5rem] mb-[10px]`}>관리자 답변</div>
                    <div>
                      <textarea
                        value={text2}
                        onChange={onChangeUpdateComment}
                        disabled={isClick2 === false}
                        className={isClick2 ? 'edit' : ''}
                      />
                      <button onClick={onClickUpdateComment}>{label2}</button>
                    </div>
                  </>
                )
                : ''
            )
        }
      </div>

      <div className='article-bottom' css={articleBottomStyle}>
        <div className='prev-link'>
          {prevItem && (
            <Link to={`${listUrl}/${prevItem.usQId}`}>
              <FaArrowLeft />
              {prevItem.title}
            </Link>
          )}
        </div>
        <div className='next-link'>
          {nextItem && (
            <Link to={`${listUrl}/${nextItem.usQId}`}>
              {nextItem.title}
              <FaArrowRight />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
