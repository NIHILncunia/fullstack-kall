import React, { useCallback, useRef } from 'react';
import { useInput } from '@/hooks';
import { commentFormStyle } from './style';
import { IReviewComment } from '@/types/tables.types';
import { useUserById } from '@/hooks/trueQuery/users';
import { useReviewById } from '@/hooks/trueQuery/review';

interface ICommentFormProps {
  userId: string;
  reviewNb: number;
}

export function CommentForm({ userId, reviewNb, }: ICommentFormProps) {
  const user = useUserById(userId);
  const review = useReviewById(reviewNb);
  const titleRef = useRef<HTMLInputElement>();
  const contentRef = useRef<HTMLInputElement>();

  const title = useInput(titleRef, 'title');
  const content = useInput(contentRef, 'content');

  const onSubmitForm = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const commentData: IReviewComment = {
      userDTO: user,
      reviewDTO: review,
      title: title.data.value,
      content: content.data.value,
    };

    console.log('덧글 정보 >> ', commentData);
    console.log('[POST /reviewcomments]', commentData);
  }, [ title, content, userId, reviewNb, ]);

  return (
    <>
      <form onSubmit={onSubmitForm} css={commentFormStyle}>
        <div className='input'>
          <input type='text' required placeholder='제목' ref={titleRef} {...title.data} />
          <input type='text' required placeholder='내용' ref={contentRef} {...content.data} />
        </div>
        <div className='button'>
          <button>덧글 등록</button>
        </div>
      </form>
    </>
  );
}
