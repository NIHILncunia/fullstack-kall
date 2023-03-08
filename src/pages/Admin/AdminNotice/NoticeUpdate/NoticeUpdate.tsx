import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import { useNavigate, useParams } from 'react-router';
import { Heading2 } from '@/components/Content';
import { AdminLayout, AppLayout } from '@/layouts';
import { useInput } from '@/hooks';
import { formStyle } from './style';
import { useAllNoticeById } from '@/hooks/trueQuery/notice';

export function NoticeUpdate() {
  const params = useParams();
  const [ text, setText, ] = useState('');
  const [ select, setSelect, ] = useState('notice');
  const [ titleError, setTitleError, ] = useState(false);
  const [ contentError, setContentError, ] = useState(false);

  const notice = useAllNoticeById(Number(params.id));
  const navi = useNavigate();

  const titleRef = useRef<HTMLInputElement>();
  const title = useInput(titleRef, 'title');

  useEffect(() => {
    if (notice && 'id' in notice) {
      title.setValue(notice.title);
      setText(notice.content);
      setSelect(notice.category_id);
    }
  }, [ notice, ]);

  const onChangeText = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }, []);

  const onChangeSelect = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(event.currentTarget.value);
  }, []);

  const onBlurTitle = useCallback(() => {
    setTitleError(title.data.value === '');
  }, [ title, ]);

  const onBlurContent = useCallback(() => {
    setContentError(text === '');
  }, [ text, ]);

  const onClickUpdateNotice = useCallback(() => {
    const updateData = {
      title: title.data.value,
      content: text,
      category_id: select,
    };

    console.log('[PUT /notices]', updateData);
    navi('/admin/notice');
  }, [ title, text, select, ]);
  return (
    <>
      <AppLayout title='공지 수정'>
        <AdminLayout pageId='admin-notice-create-page'>
          <Heading2>공지 수정</Heading2>

          <div css={formStyle}>
            <label htmlFor='category'>
              <span>분류</span>
              <select id='category' value={select} onChange={onChangeSelect}>
                <option value='notice'>공지사항</option>
                <option value='faq_01'>FAQ/로그인</option>
                <option value='faq_02'>FAQ/배송</option>
                <option value='faq_03'>FAQ/결제</option>
                <option value='faq_04'>FAQ/기타</option>
              </select>
            </label>
            <label htmlFor='title'>
              <span>제목</span>
              <input
                type='text'
                ref={titleRef}
                {...title.data}
                onBlur={onBlurTitle}
              />
            </label>
            {titleError && (<p>제목을 입력해주세요.</p>)}
            <label htmlFor='content'>
              <span>내용</span>
              <textarea id='content' value={text} onChange={onChangeText} onBlur={onBlurContent} />
            </label>
            {contentError && (<p>내용을 입력해주세요.</p>)}
            <div>
              <button onClick={onClickUpdateNotice}>수정</button>
            </div>
          </div>
        </AdminLayout>
      </AppLayout>
    </>
  );
}
