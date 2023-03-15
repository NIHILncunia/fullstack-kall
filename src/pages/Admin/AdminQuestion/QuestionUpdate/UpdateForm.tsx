import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { useQueryClient } from 'react-query';
import { Heading2 } from '@/components/Content';
import { useInput } from '@/hooks';
import { useQuestionById, useUpdateQuestion } from '@/hooks/trueQuery/question';
import { updateFormStyle } from './style';
import { IQuestion } from '@/types/tables.types';

interface IUpdateFormProps {
  id: string;
}

export function UpdateForm({ id, }: IUpdateFormProps) {
  const [ titleError, setTitleError, ] = useState(false);
  const [ contentError, setContentError, ] = useState(false);
  const [ text, setText, ] = useState('');

  const navi = useNavigate();
  const { pathname, } = useLocation();
  const [ { role, }, ] = useCookies([ 'id', 'role', ]);

  const question = useQuestionById(Number(id), role);
  const updateQuestion = useUpdateQuestion();
  const qc = useQueryClient();

  const titleRef = useRef<HTMLInputElement>();
  const title = useInput(titleRef, 'title');

  const onChangeText = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }, []);

  useEffect(() => {
    if (question && 'productQId' in question) {
      title.setValue(question.title);
      setText(question.content);
    }
  }, [ question, ]);

  const onClickUpdate = useCallback(() => {
    const updateData: IQuestion = {
      ...question,
      userDTO: question?.userDTO,
      productDTO: question?.productDTO,
      title: title.data.value,
      content: text,
    };

    updateQuestion.mutate({ id: Number(id), data: updateData, role, }, {
      onSuccess: () => {
        qc.refetchQueries([ 'getQuestions', ]);
        qc.refetchQueries([ 'getQuestionById', question.productQId, ]);
      },
    });
    const url = role === 'admin' ? '/admin' : '';
    console.log(`[PUT ${url}/questions/${id}]`, updateData);
    navi(
      pathname.includes('mypage')
        ? '/mypage/question?current=question'
        : '/admin/question'
    );
  }, [ id, title, text, pathname, question, updateQuestion, ]);

  return (
    <>
      <Heading2>문의 수정</Heading2>
      <div css={updateFormStyle}>
        <label htmlFor='title'>
          <span>제목</span>
          <input
            type='text'
            ref={titleRef}
            {...title.data}
            onBlur={() => {
              if (title.data.value === '') {
                setTitleError(true);
              }
            }}
          />
        </label>
        {titleError && (<p>제목을 입력해주세요.</p>)}
        <label htmlFor='content'>
          <span>내용</span>
          <textarea
            value={text}
            onChange={onChangeText}
            onBlur={() => {
              if (text === '') {
                setContentError(true);
              }
            }}
          />
        </label>
        {contentError && (<p>내용을 입력해주세요.</p>)}
        <div>
          <button onClick={onClickUpdate}>수정 완료</button>
        </div>
      </div>
    </>
  );
}
