import React, { useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
import { AppLayout } from '@/layouts';
import {
  articleBottomStyle, articleContentStyle, articleTopStyle, goToBackStyle, noticeArticlePageStyle
} from './style';
import {
  useFaqById, useFaqs, useNoticeById, useNotices
} from '@/hooks/trueQuery/notice';
import { useCategoryById } from '@/hooks/trueQuery/category';

export function NoticeaArticle() {
  const [ { role, }, ] = useCookies([ 'role', ]);
  const params = useParams();
  const notice = useNoticeById(Number(params.id));
  const faq = useFaqById(Number(params.id));
  const notices = useNotices();
  const faqs = useFaqs();

  const navi = useNavigate();
  const { pathname, } = useLocation();

  const listUrl = pathname.includes('admin')
    ? `/admin/notice`
    : `/community/notice`;
  const cond = notice && 'id' in notice;

  const categoryId = cond ? notice.category_id : faq.category_id;
  const category = useCategoryById(categoryId, {
    enabled: !!categoryId,
  });

  const currentIndex = useMemo(() => {
    return cond
      ? notices.findIndex((item) => item.id === Number(params.id))
      : faqs.findIndex((item) => item.id === Number(params.id));
  }, [ cond, notices, params, faqs, ]);

  const prevItem = cond ? notices[currentIndex - 1] : faqs[currentIndex - 1];
  const nextItem = cond ? notices[currentIndex + 1] : faqs[currentIndex + 1];

  const id = cond ? notice.id : faq.id;
  const title = cond ? notice.title : faq.title;
  const url = cond ? 'notice' : 'faq';
  const date = cond ? notice.date : faq.date;
  const content = cond ? notice.content : faq.content;
  const cnt = cond ? notice.cnt : faq.cnt;

  const onClickEdit = useCallback(() => {
    navi(`/admin/notice/${id}/edit`);
  }, [ id, ]);

  const onClickDelete = useCallback(() => {
    console.log(`[DELETE /notices/${id}]`);
  }, [ id, ]);

  return (
    <>
      <AppLayout title={title}>
        <div id='community-notice-article-page' css={noticeArticlePageStyle}>
          <div className='go-to-back' css={goToBackStyle}>
            {
              pathname.includes('community')
                ? (
                  <Link to={`/community/${url}`}>목록으로</Link>
                )
                : (
                  <Link to={`/admin/${url}`}>목록으로</Link>
                )
            }
            {
              role === 'admin' && (
                <>
                  <button onClick={onClickEdit}>수정</button>
                  <button onClick={onClickDelete}>삭제</button>
                </>
              )
            }
          </div>
          <div className='border border-solid border-black-200 divide-y divide-solid divide-black-200 mb-[30px]'>
            <div className='article-top' css={articleTopStyle}>
              <h3>{title}</h3>
              <div>
                <p>
                  <span>카테고리</span>
                  <span>{category.categoryName}</span>
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
                <Link to={`${listUrl}/${prevItem.id}`}>
                  <FaArrowLeft />
                  {prevItem.title}
                </Link>
              )}
            </div>
            <div className='next-link'>
              {nextItem && (
                <Link to={`${listUrl}/${nextItem.id}`}>
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
