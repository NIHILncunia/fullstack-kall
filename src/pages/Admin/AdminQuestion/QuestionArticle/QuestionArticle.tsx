import React, {
  useCallback, useEffect, useMemo, useState
} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import moment from 'moment';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {
  useDeleteQuestion, useQuestionById, useQuestionByUserId, useQuestions
} from '@/hooks/trueQuery/question';
import { AppLayout } from '@/layouts';
import {
  articleBottomStyle, articleContentStyle, articleTopStyle, commentAdminStyle, goToBackStyle
} from './style';
import { useUserById } from '@/hooks/trueQuery/users';

export function QuestionArticle() {
  const [ isEdit, setIsEdit, ] = useState(false);
  const [ text, setText, ] = useState('');
  const [ label, setLabel, ] = useState('수정');

  const { id: questionId, } = useParams();
  const { pathname, } = useLocation();
  const navi = useNavigate();

  const pageCond = pathname.includes('mypage');
  const deleteQuestion = useDeleteQuestion();

  const [ { id, role, }, ] = useCookies([ 'id', 'role', ]);

  const question = useQuestionById(Number(questionId), 'admin');
  const questions = useQuestions();
  const myQuestion = useQuestionByUserId(id);
  const userData = useUserById(question.userDTO?.userId, {
    enabled: 'productQId' in question,
  });

  console.log(userData);

  const cond = question && question?.comment === null;

  const onClickEdit = useCallback(() => {
    // navi(`/admin/notice/${id}/edit`);
    navi(
      role === 'admin'
        ? `/admin/question/${questionId}/edit`
        : `/mypage/question/${questionId}/edit`
    );
  }, [ questionId, role, ]);

  const onClickDelete = useCallback(() => {
    deleteQuestion.mutate({
      questionId: Number(questionId),
      role: 'admin',
    });
    console.log(`[DELETE /questions/${questionId}]`);
  }, [ questionId, ]);

  const currentIndex = useMemo(() => {
    return pageCond
      ? myQuestion.findIndex((item) => item.productQId === Number(questionId))
      : questions.findIndex((item) => item.productQId === Number(questionId));
  }, [ questions, questionId, ]);

  const prevItem = pageCond ? myQuestion[currentIndex - 1] : questions[currentIndex - 1];
  const nextItem = pageCond ? myQuestion[currentIndex + 1] : questions[currentIndex + 1];

  const url = (questionId: number) => {
    return pageCond
      ? `/mypage/question/${questionId}`
      : `/admin/question/${questionId}`;
  };

  const onChangeText = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }, []);

  const onClickCommentEdit = useCallback(() => {
    if (isEdit) {
      setIsEdit(false);
      setLabel(cond ? '등록' : '수정');

      const updateData = {
        comment: text,
      };

      console.log(`[PATCH /questions/${questionId}]`, updateData);
    } else {
      setIsEdit(true);
      setLabel(cond ? '등록완료' : '수정완료');
    }
  }, [ isEdit, text, questionId, cond, ]);

  useEffect(() => {
    if (question && 'productQId' in question) {
      setText(question.comment || '');
      setLabel(cond ? '등록' : '수정');
    } else {
      setLabel(cond ? '등록' : '답글 작성');
    }
  }, [ question, cond, ]);

  return (
    <>
      <AppLayout title={`${question.title}`}>
        <div id='question-article-page' css={tw`py-[50px] text-[1.2rem] text-black-base`}>
          <div className='go-to-back' css={goToBackStyle}>
            {
              pageCond
                ? (
                  <Link to='/mypage/question?current=question'>목록으로</Link>
                )
                : (
                  <Link to='/admin/question'>목록으로</Link>
                )
            }
            {(role === 'admin' || id === userData.userId) && (
              <>
                <button onClick={onClickEdit}>수정</button>
                <button onClick={onClickDelete}>삭제</button>
              </>
            )}
          </div>
          <div className='border border-solid border-black-200 divide-y divide-solid divide-black-200 mb-[30px]'>
            <div className='article-top' css={articleTopStyle}>
              <h3>{question.title}</h3>
              <div>
                <p>
                  <span>작성자</span>
                  <span>{userData.name}({userData.userId})</span>
                </p>
                <p>
                  <span>작성일</span>
                  <span>{moment(question.date1).format('YYYY-MM-DD HH:mm:ss')}</span>
                </p>
              </div>
            </div>
            <div className='article-content' css={articleContentStyle}>{question.content}</div>
          </div>

          {role === 'admin' && (
            <>
              <div css={tw`font-[900] text-[1.5rem] mb-[10px]`}>관리자 답변</div>
              <div css={commentAdminStyle}>
                <textarea
                  value={text}
                  onChange={onChangeText}
                  disabled={isEdit === false}
                  className={isEdit ? 'edit' : ''}
                />
                <button onClick={onClickCommentEdit}>{label}</button>
              </div>
            </>
          )}

          {(role === 'user' && !cond) && (
            <>
              <div css={tw`font-[900] text-[1.5rem] mb-[10px]`}>관리자 답변</div>
              <div css={tw`p-[10px] text-justify break-all border border-black-200 bg-black-50 mb-[10px]`}>{question.comment}</div>
              <p css={tw`text-right font-[900] text-[1.4rem] mb-[30px]`}>{question.date2}</p>
            </>
          )}

          <div className='article-bottom' css={articleBottomStyle}>
            <div className='prev-link'>
              {prevItem && (
                <Link to={url(prevItem.productQId)}>
                  <FaArrowLeft />
                  {prevItem.title}
                </Link>
              )}
            </div>
            <div className='next-link'>
              {nextItem && (
                <Link to={url(nextItem.productQId)}>
                  {nextItem.title}
                  <FaArrowRight />
                </Link>
              )}
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
