import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { AppLayout } from '@/layouts';
import { IsLoding } from '@/components/Content';
import {
  useNotices, useNoticeById, useFAQById, useFAQ
} from '@/hooks/queries/notice';
import { useCategoryById } from '@/hooks/queries/category';
import {
  articleBottomStyle, articleContentStyle, articleTopStyle, goToBackStyle, noticeArticlePageStyle
} from './style';

export function NoticeaArticle() {
  const params = useParams();
  const notice = useNoticeById(Number(params.id));
  const faq = useFAQById(Number(params.id));
  const notices = useNotices();
  const faqs = useFAQ();

  const categoryId = 'id' in notice ? notice.category_id : faq.category_id;
  const category = useCategoryById(categoryId);

  console.log(notice);
  console.log(faq);
  console.log(category);

  const currentIndex = useMemo(() => {
    return 'id' in notice
      ? notices.findIndex((item) => item.id === Number(params.id))
      : faqs.findIndex((item) => item.id === Number(params.id));
  }, [ notices, params, faqs, ]);

  const prevItem = 'id' in notice ? notices[currentIndex - 1] : faqs[currentIndex - 1];
  const nextItem = 'id' in notice ? notices[currentIndex + 1] : faqs[currentIndex + 1];

  const title = 'id' in notice ? notice.title : faq.title;
  const url = 'id' in notice ? 'notice' : 'faq';
  const date = 'id' in notice ? notice.date : faq.date;
  const content = 'id' in notice ? notice.content : faq.content;
  const cnt = 'id' in notice ? notice.cnt : faq.cnt;

  return (
    <>
      <AppLayout title={title}>
        <div id='community-notice-article-page' css={noticeArticlePageStyle}>
          <IsLoding />
          <div className='go-to-back' css={goToBackStyle}>
            <Link to={`/community/${url}`}>목록으로</Link>
          </div>
          <div className='border border-solid border-black-200 divide-y divide-solid divide-black-200 mb-[30px]'>
            <div className='article-top' css={articleTopStyle}>
              <h3>{title}</h3>
              <div>
                <p>
                  <span>카테고리</span>
                  <span>{category.category_name}</span>
                </p>
                <p>
                  <span>작성일</span>
                  <span>{moment(date).format('YYYY-MM-DD HH:mm:ss')}</span>
                </p>
                <p>
                  <span>조회수</span>
                  <span>{cnt}</span>
                </p>
              </div>
            </div>
            <div className='article-content' css={articleContentStyle}>{content}</div>
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
