import React, {
  ChangeEvent, FormEvent, useCallback, useRef, useState
} from 'react';
import { useCookies } from 'react-cookie';
import { useInput } from '@/hooks';
import { IDirect } from '@/types/tables.types';
import { formStyle } from './style';

export function DirectForm() {
  const [ cookies, ] = useCookies([ 'id', ]);
  const [ category, setCategory, ] = useState('faq_01');
  const [ content, setContent, ] = useState(
    `구입하신 날짜:

구입하신 상품:

문의 내용:`.trim()
  );

  const titleRef = useRef<HTMLInputElement>(null);

  const title = useInput(titleRef, 'title');

  const onChangeCategory = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  }, []);

  const onChangeContent = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  }, []);

  const onSubmitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newDirectQuestion: IDirect = {
      user_id: cookies.id,
      category_id: category,
      title: title.data.value,
      content,
      comment: '',
    };

    console.log('새로운 문의 데이터 생성', newDirectQuestion);
    console.log('작성 완료!');
  }, [ category, content, ]);

  return (
    <>
      <form onSubmit={onSubmitForm} css={formStyle}>
        <label htmlFor='title'>
          <span>제목</span>
          <input
            type='text'
            placeholder='제목을 입력하세요.'
            required
            ref={titleRef}
            {...title.data}
          />
        </label>
        <label htmlFor='category'>
          <span>카테고리</span>
          <select id='category' required value={category} onChange={onChangeCategory}>
            <option value='q_01'>로그인/계정</option>
            <option value='q_02'>배송</option>
            <option value='q_03'>결제</option>
            <option value='q_04'>기타</option>
          </select>
        </label>
        <label htmlFor='content'>
          <span>문의 내용</span>
          <textarea id='content' required value={content} onChange={onChangeContent} />
        </label>
        <button>문의하기</button>
      </form>
    </>
  );
}
