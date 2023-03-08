import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import tw from 'twin.macro';
import { Heading2 } from '@/components/Content';
import { AdminLayout, AppLayout } from '@/layouts';
import { useFaqs, useNotices } from '@/hooks/trueQuery/notice';
import { NoticeListItem } from '@/components/Content/Admin';
import { categoryButtonStyle, noticeButtonStyle, noticeListStyle } from './style';

export function AdminNotice() {
  const [ label, setlabel, ] = useState('공지사항');
  const [ items, setItems, ] = useState<number[]>([]);
  const notices = useNotices();
  const faqs = useFaqs();
  const navi = useNavigate();

  const onClickNewNotice = useCallback(() => {
    navi('/admin/notice/create');
  }, []);

  const onClickAllCheck = useCallback(() => {
    setItems(
      label === '공지사항'
        ? notices.map((item) => item.id)
        : faqs.map((item) => item.id)
    );
  }, [ label, notices, faqs, ]);

  const onClickReset = useCallback(() => {
    setItems([]);
  }, []);

  const onClickCheckDelete = useCallback(() => {
    // 선택 삭제의 경우 아이디 배열을 전달한다.
    console.log('[DELETE /notices]', items);
  }, [ items, ]);

  const onClickLabel = useCallback(() => {
    if (label === '공지사항') {
      setlabel('FAQ');
    } else {
      setlabel('공지사항');
    }
  }, [ label, ]);

  return (
    <>
      <AppLayout title='공지 관리'>
        <AdminLayout pageId='admin-notice-page'>
          <Heading2>{label} 관리</Heading2>

          <div css={categoryButtonStyle}>
            <button
              onClick={onClickLabel}
              css={label === '공지사항' && tw`!bg-point-h-base text-white`}
            >
              공지사항
            </button>
            <button
              onClick={onClickLabel}
              css={label !== '공지사항' && tw`!bg-point-h-base text-white`}
            >
              FAQ
            </button>
          </div>

          <div css={noticeButtonStyle}>
            <button onClick={onClickNewNotice}>공지 등록</button>
            <button onClick={onClickAllCheck}>전체 선택</button>
            <button onClick={onClickReset}>선택 취소</button>
            <button onClick={onClickCheckDelete}>선택 삭제</button>
          </div>

          <div css={noticeListStyle}>
            <div className='list-header'>
              <div>선택</div>
              <div>분류</div>
              <div>제목</div>
              <div>조회수</div>
            </div>
            {label === '공지사항' && notices.map((item) => (
              <NoticeListItem
                key={item.id}
                item={item}
                items={items}
                setItems={setItems}
              />
            ))}
            {label !== '공지사항' && faqs.map((item) => (
              <NoticeListItem
                key={item.id}
                item={item}
                items={items}
                setItems={setItems}
              />
            ))}
          </div>
        </AdminLayout>
      </AppLayout>
    </>
  );
}
