import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { AppLayout } from '@/layouts';
import { IsLoding } from '@/components/Content';
import { useNoticeByCategory, useNoticeById } from '@/hooks/queries/notice';
import { useCategoryById } from '@/hooks/queries/category';
import {
  articleBottomStyle, articleContentStyle, articleTopStyle, goToBackStyle, noticeArticlePageStyle
} from './style';

export function NoticeaArticle() {
  const params = useParams();
  const notice = useNoticeById(Number(params.id));
  const notices = useNoticeByCategory(notice?.category_id);
  const category = useCategoryById(notice?.category_id);

  const currentIndex = useMemo(() => {
    return notices.findIndex((item) => item.id === Number(params.id));
  }, [ notices, params, ]);

  const prevItem = notices[currentIndex - 1];
  const nextItem = notices[currentIndex + 1];

  return (
    <>
      <AppLayout title={notice.title}>
        <div id='community-notice-article-page' css={noticeArticlePageStyle}>
          <IsLoding />
          <div className='go-to-back' css={goToBackStyle}>
            <Link to={`/community/${notice.category_id}`}>목록으로</Link>
          </div>
          <div className='border border-solid border-black-200 divide-y divide-solid divide-black-200 mb-[30px]'>
            <div className='article-top' css={articleTopStyle}>
              <h3>{notice.title}</h3>
              <div>
                <p>
                  <span>카테고리</span>
                  <span>{category.category_name}</span>
                </p>
                <p>
                  <span>작성일</span>
                  <span>{moment(notice.date).format('YYYY-MM-DD HH:mm:ss')}</span>
                </p>
                <p>
                  <span>조회수</span>
                  <span>{notice.cnt}</span>
                </p>
              </div>
            </div>
            <div className='article-content' css={articleContentStyle}>{notice.content}</div>
          </div>

          <div className='article-bottom' css={articleBottomStyle}>
            <div className='prev-link'>
              {prevItem && (
                <Link to={`/community/notice/${prevItem.id}`}>
                  <FaArrowLeft />
                  {prevItem.title}
                </Link>
              )}
            </div>
            <div className='next-link'>
              {nextItem && (
                <Link to={`/community/notice/${nextItem.id}`}>
                  {nextItem.title}
                  <FaArrowRight />
                </Link>
              )}
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
