import React, { useCallback, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import { AppLayout } from '@/layouts';
import { Heading2 } from '@/components/Content';
import { createReviewButtonBack, createReviewForm } from '../MypageReview/style';
import { useInput } from '@/hooks';
import { useUserById } from '@/hooks/trueQuery/users';
import { useProductById } from '@/hooks/trueQuery/product';
import { IQuestion } from '@/types/tables.types';
import { useCreateQuestion } from '@/hooks/trueQuery/question';

export function CreateQuestion() {
  const [ content, setContent, ] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [ { id, pId, }, _, removeCookie, ] = useCookies([ 'id', 'pId', ]);
  const navi = useNavigate();
  const user = useUserById(id);
  const product = useProductById(pId);
  const createQuestion = useCreateQuestion();

  const titleRef = useRef<HTMLInputElement>();
  const contentRef = useRef<HTMLTextAreaElement>();

  const title = useInput(titleRef, 'title');

  const onChangeContent = useCallback(() => {
    setContent(contentRef.current.value);
  }, [ contentRef, ]);

  const onClickCreate = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newData: IQuestion = {
      userDTO: user,
      productDTO: product,
      title: title.data.value,
      content,
    };

    createQuestion.mutate(newData);
    console.log('[POST /questions]', newData);

    removeCookie('pId', { path: '/', });
    navi('/mypage/question?current=question');
  }, [ id, pId, title, content, ]);

  return (
    <>
      <AppLayout title='상품 문의 작성'>
        <div id='question-create-page' css={tw`py-[50px] text-[1.2rem] text-black-base`}>
          <Heading2>상품 문의 작성</Heading2>

          <div css={createReviewButtonBack}>
            <Link to='/mypage/question?current=question'>문의 내역으로</Link>
          </div>

          <form onSubmit={onClickCreate} css={createReviewForm}>
            <label htmlFor='title'>
              <span>제목</span>
              <input type='text' ref={titleRef} {...title.data} required />
            </label>
            <label htmlFor='content'>
              <span>내용</span>
              <textarea id='content' ref={contentRef} value={content} onChange={onChangeContent} required />
            </label>

            <div className='button'>
              <button>리뷰 작성</button>
            </div>
          </form>
        </div>
      </AppLayout>
    </>
  );
}
