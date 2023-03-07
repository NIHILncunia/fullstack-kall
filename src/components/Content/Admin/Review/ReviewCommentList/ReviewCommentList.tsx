import React, { useCallback, useState } from 'react';
import { IReviewComment } from '@/types/tables.types';
import { buttonStyle, reviewCommentStyle } from './style';
import { CommentItem } from '../CommentItem/CommentItem';

interface IReviewCommentListProps {
  comments: IReviewComment[];
}

export function ReviewCommentList({ comments, }: IReviewCommentListProps) {
  const [ isOpen, setIsOpen, ] = useState(false);
  const label = isOpen ? '접기' : '펼치기';

  const onClickOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className='review-comment' css={reviewCommentStyle}>
        <p>
          {
            comments.length !== 0
              ? (
                <>총 {comments.length}개의 덧글이 있습니다.</>
              )
              : (
                <>덧글이 없습니다.</>
              )
          }
          <button onClick={onClickOpen} css={buttonStyle}>{label}</button>
        </p>

        {isOpen && comments.map((item) => (
          <CommentItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
