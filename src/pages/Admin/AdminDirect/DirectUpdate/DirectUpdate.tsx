import React, { useCallback, useEffect, useState } from 'react';
import tw from 'twin.macro';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { useQueryClient } from 'react-query';
import { AppLayout } from '@/layouts';
import { Heading2 } from '@/components/Content';
import { directUpdateButtonStyle, directUpdateFormStyle } from './style';
import { useDirectById, useUpdateDirect } from '@/hooks/trueQuery/direct';
import { IDirect } from '@/types/tables.types';
import { useUserById } from '@/hooks/trueQuery/users';
import { useCategoryById } from '@/hooks/trueQuery/category';

export function DirectUpdate() {
  const [ title, setTitle, ] = useState('');
  const [ content, setContent, ] = useState('');
  const [ category, setCategory, ] = useState('q_01');

  const qc = useQueryClient();

  const { id, } = useParams();
  const { pathname, } = useLocation();
  const direct = useDirectById(Number(id), 'admin');
  const [ cookies, ] = useCookies([ 'id', 'role', ]);
  const navi = useNavigate();
  const updateDirect = useUpdateDirect();

  const user = useUserById(cookies.id);
  const categoryDTO = useCategoryById(category);

  const onChangeTitle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }, []);

  const onChangeContent = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  }, []);

  const onChangeCategory = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  }, []);

  useEffect(() => {
    if (direct && 'usQId' in direct) {
      setTitle(direct.title);
      setContent(direct.content);
      setCategory(direct.categoryDTO?.categoryId);
    }
  }, [ direct, ]);

  const onClickSubmit = useCallback(() => {
    const updateData: IDirect = {
      usQId: Number(id),
      userDTO: user,
      title,
      content,
      categoryDTO,
    };

    updateDirect.mutate(
      {
        data: updateData,
        directId: Number(id),
        role: cookies.role,
      },
      {
        onSuccess: () => {
          qc.refetchQueries([ 'getDirectByUserId', cookies.id, ]);
        },
      }
    );

    if (cookies.role === 'admin') {
      console.log(`[UPDATE /admin/directs/${id}`, updateData);
    } else {
      console.log(`[UPDATE /directs/${id}`, updateData);
    }
    navi(
      pathname.includes('admin')
        ? '/admin/direct'
        : '/mypage/question?current=direct'
    );
  }, [ title, content, category, cookies, ]);

  return (
    <>
      <AppLayout title='1:1 문의 수정'>
        <div id='direct-update-page' css={tw`py-[50px] text-[1.2rem] text-black-base`}>
          <Heading2>1:1 문의 수정</Heading2>
          <div css={directUpdateFormStyle}>
            <label htmlFor='category'>
              <span>분류</span>
              <select id='category' value={category} onChange={onChangeCategory}>
                <option value='q_01'>로그인/계정</option>
                <option value='q_02'>배송</option>
                <option value='q_03'>결제</option>
                <option value='q_04'>기타</option>
              </select>
            </label>

            <label htmlFor='title'>
              <span>제목</span>
              <input type='text' id='title' value={title} onChange={onChangeTitle} />
            </label>

            <label htmlFor='content'>
              <span>내용</span>
              <textarea id='content' value={content} onChange={onChangeContent} />
            </label>

          </div>
          <div css={directUpdateButtonStyle}>
            <button onClick={onClickSubmit}>수정 완료</button>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
