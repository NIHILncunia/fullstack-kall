import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import moment from 'moment';
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
import { IReviewComment } from '@/types/tables.types';
import { commentItemStyle } from './style';
import { useInput } from '@/hooks';

interface ICommentItemProps {
  item: IReviewComment;
}

export function CommentItem({ item, }: ICommentItemProps) {
  const [ isEdit, setIsEdit, ] = useState(false);

  const titleRef = useRef<HTMLInputElement>();
  const contentRef = useRef<HTMLInputElement>();

  const title = useInput(titleRef, 'title');
  const content = useInput(contentRef, 'content');

  const [ cookies, ] = useCookies([ 'id', 'role', ]);

  useEffect(() => {
    title.setValue(item.title);
    content.setValue(item.content);
  }, [ item, ]);

  const onClickDelete = useCallback((id: number) => {
    console.log(`[DELETE /reviewcomments/${id}]`);
  }, []);

  const onClickEdit = useCallback((id: number) => {
    if (isEdit) {
      const updateData = {
        title: title.data.value,
        content: content.data.value,
      };

      setIsEdit(false);
      console.log(`[PUT /reviewcomments/${id}]`, updateData);
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
