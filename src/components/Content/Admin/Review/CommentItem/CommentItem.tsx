import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import moment from 'moment';
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
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
  const updaterc = useUpdateReviewComment(item.reviewDTO.reviewId);
  const deleterc = useDeleteReviewComment(item.reviewDTO.reviewId);

  const title = useInput(titleRef, 'title');
  const content = useInput(contentRef, 'content');

  const [ cookies, ] = useCookies([ 'id', 'role', ]);

  useEffect(() => {
    title.setValue(item.title);
    content.setValue(item.content);
  }, [ item, ]);

  const onClickDelete = useCallback((id: number) => {
    if (cookies.role === 'admin') {
      deleterc.mutate({ role: cookies.role, rcId: id, });
      console.log(`[DELETE /admin/reviews/comment/${id}]`);
    } else {
      deleterc.mutate({ rcId: id, });
      console.log(`[DELETE /reviews/comment/${id}]`);
    }
  }, [ cookies, ]);

  const onClickEdit = useCallback((id: number) => {
    if (isEdit) {
      const updateData: IReviewComment = {
        title: title.data.value,
        content: content.data.value,
      };

      if (cookies.role === 'admin') {
        updaterc.mutate({ rcId: id, data: updateData, role: cookies.role, }); console.log(`[PUT /admin/reviews/comment/${id}]`, updateData);
      } else {
        updaterc.mutate({ rcId: id, data: updateData, });
        console.log(`[PUT /reviews/comment/${id}]`, updateData);
      }

      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  }, [ isEdit, title, content, ]);

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
            {(cookies.id === item.userDTO || cookies.role === 'admin') && (
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
          <div>{item.userDTO.userId}</div>
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
