import React, { useCallback, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { useCookies } from 'react-cookie';
import { useInput } from '@/hooks';
import { commentFormStyle } from './style';
import { IReviewComment } from '@/types/tables.types';
import { useUserById } from '@/hooks/trueQuery/users';
import { useReviewById } from '@/hooks/trueQuery/review';
import { useCreateReviewComment } from '@/hooks/trueQuery/reviewComment';

interface ICommentFormProps {
  userId: string;
  reviewNb: number;
}

export function CommentForm({ userId, reviewNb, }: ICommentFormProps) {
  const user = useUserById(userId);
  const review = useReviewById(reviewNb);
  const titleRef = useRef<HTMLInputElement>();
  const contentRef = useRef<HTMLInputElement>();
  const [ { role, }, ] = useCookies([ 'role', ]);

  const qc = useQueryClient();
  const createReviewComment = useCreateReviewComment(role);

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

    createReviewComment.mutate(commentData, {
      onSuccess: () => {
        qc.refetchQueries([ 'getReviewCommentByReviewId', reviewNb, ]);
      },
    });
    console.log('[POST /reviewcomments]', commentData);
  }, [ title, content, userId, reviewNb, createReviewComment, ]);

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
