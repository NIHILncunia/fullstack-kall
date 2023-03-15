import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import moment from 'moment';
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
import { useQueryClient } from 'react-query';
import { IReviewComment } from '@/types/tables.types';
import { commentItemStyle } from './style';
import { useInput } from '@/hooks';
import { useDeleteReviewComment, useUpdateReviewComment } from '@/hooks/trueQuery/reviewComment';

interface ICommentItemProps {
  item: IReviewComment;
}

export function CommentItem({ item, }: ICommentItemProps) {
  const [ isEdit, setIsEdit, ] = useState(false);

  const titleRef = useRef<HTMLInputElement>();
  const contentRef = useRef<HTMLInputElement>();
  const updaterc = useUpdateReviewComment(item.reviewCmtId);
  const deleterc = useDeleteReviewComment(item.reviewCmtId);

  const title = useInput(titleRef, 'title');
  const content = useInput(contentRef, 'content');
  const qc = useQueryClient();

  const [ cookies, ] = useCookies([ 'id', 'role', ]);

  useEffect(() => {
    title.setValue(item.title);
    content.setValue(item.content);
  }, [ item, ]);

  const onClickDelete = useCallback((id: number) => {
    if (cookies.role === 'admin') {
      deleterc.mutate(cookies.role, {
        onSuccess: () => {
          const reviewId = item?.reviewDTO?.reviewId;
          qc.refetchQueries([ 'getReviewCommentByReviewId', reviewId, ]);
        },
      });
      console.log(`[DELETE /admin/reviews/comment/${id}]`);
    } else {
      deleterc.mutate('', {
        onSuccess: () => {
          const reviewId = item?.reviewDTO?.reviewId;
          qc.refetchQueries([ 'getReviewCommentByReviewId', reviewId, ]);
        },
      });
      console.log(`[DELETE /reviews/comment/${id}]`);
    }
  }, [ cookies, ]);

  const onClickEdit = useCallback((id: number) => {
    if (isEdit) {
      const updateData: IReviewComment = {
        reviewCmtId: item.reviewCmtId,
        userDTO: item.userDTO,
        reviewDTO: item.reviewDTO,
        title: title.data.value,
        content: content.data.value,
      };

      if (cookies.role === 'admin') {
        updaterc.mutate({ data: updateData, role: cookies.role, });
        console.log(`[PUT /admin/reviewcomments/${id}]`, updateData);
      } else {
        updaterc.mutate({ data: updateData, });
        console.log(`[PUT /reviewcomments/${id}]`, updateData);
      }

      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  }, [ isEdit, title, content, item, ]);

  return (
    <>
      <div css={commentItemStyle}>
        <div>
          <div>
            {
              isEdit
                ? (<input type='text' ref={titleRef} {...title.data} />)
                : (<span>{item.title}</span>)
            }
            {(cookies.id === item.userDTO?.userId || cookies.role === 'admin') && (
              <>
                <button onClick={() => onClickEdit(item.reviewCmtId)}>
                  {isEdit ? (<FaCheck />) : (<FaEdit />)}
                </button>
                <button onClick={() => onClickDelete(item.reviewCmtId)}>
                  <FaTimes />
                </button>
              </>
            )}
          </div>
          <div>{item.userDTO?.userId}</div>
          <div>{moment(item.date).format('YYYY-MM-DD HH:mm:ss')}</div>
        </div>
        {
          isEdit
            ? (<input type='text' ref={contentRef} {...content.data} />)
            : (<div>{item.content}</div>)
        }
      </div>
    </>
  );
}
