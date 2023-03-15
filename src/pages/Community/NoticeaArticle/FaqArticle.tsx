import React, { useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
import { useQueryClient } from 'react-query';
import { AppLayout } from '@/layouts';
import {
  articleBottomStyle, articleContentStyle, articleTopStyle, goToBackStyle, noticeArticlePageStyle
} from './style';
import {
  useDeleteNotice,
  useFaqById, useFaqs
} from '@/hooks/trueQuery/notice';
import { setDate } from '@/utils/setDate';

export function FaqArticle() {
  const [ { role, }, ] = useCookies([ 'role', ]);
  const params = useParams();
  const faq = useFaqById(Number(params.id));
  const faqs = useFaqs();

  console.log('faqs >> ', faqs);

  const navi = useNavigate();
  const qc = useQueryClient();
  const deleteNotice = useDeleteNotice(faq.noticeId);
  const { pathname, } = useLocation();

  console.log('faq >> ', faq);

  const listUrl = pathname.includes('admin')
    ? `/admin/notice`
    : `/community/faq`;

  const category = faq?.categoryDTO?.categoryName;

  console.log(category);

  const currentIndex = useMemo(() => {
    return faqs.findIndex((item) => item.noticeId === Number(params.id));
  }, [ params, faqs, ]);

  const prevItem = faqs[currentIndex - 1];
  const nextItem = faqs[currentIndex + 1];

  const id = faq.noticeId;
  const {
    title, date, content, cnt,
  } = faq;

  const onClickEdit = useCallback(() => {
    navi(`/admin/notice/${id}/edit`);
  }, [ id, ]);

  const onClickDelete = useCallback(() => {
    deleteNotice.mutate(undefined, {
      onSuccess: () => {
        qc.refetchQueries([ 'getFaqs', ]);
        console.log(`[DELETE /admin/notices/${id}]`);
        navi(listUrl);
      },
    });
  }, [ id, deleteNotice, ]);

  return (
    <>
      <AppLayout title={title}>
        <div id='community-notice-article-page' css={noticeArticlePageStyle}>
          <div className='go-to-back' css={goToBackStyle}>
            <Link to={listUrl}>목록으로</Link>
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
                  <span>{category}</span>
                </p>
                <p>
                  <span>작성일</span>
                  <span>{setDate(date)}</span>
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
                <Link to={`${listUrl}/${prevItem.noticeId}`}>
                  <FaArrowLeft />
                  {prevItem.title}
                </Link>
              )}
            </div>
            <div className='next-link'>
              {nextItem && (
                <Link to={`${listUrl}/${nextItem.noticeId}`}>
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
