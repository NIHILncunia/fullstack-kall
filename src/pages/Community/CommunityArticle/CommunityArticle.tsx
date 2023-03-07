import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AppLayout, CommunityLayout } from '@/layouts';
import { Heading2 } from '@/components/Content';
import { articleListStyle } from './style';
import { useFaqs, useNotices } from '@/hooks/trueQuery/notice';
import { useCategories } from '@/hooks/trueQuery/category';

interface ICommunityArticleProps {
  title: string;
  category?: string;
}

export function CommunityArticle({ title, category, }: ICommunityArticleProps) {
  const notices = useNotices();
  const faqs = useFaqs();
  const categories = useCategories();

  const getCategoryName = (categoryId: string) => {
    const [ category, ] = categories.filter((item) => item.id === categoryId);

    return category.category_name;
  };

  return (
    <>
      <AppLayout title={`커뮤니티 - ${title}`}>
        <CommunityLayout pageId='community-guide-page'>
          <Heading2>{title}</Heading2>
          <div className='article-list' css={articleListStyle}>
            <div className='list-header'>
              <p>번호</p>
              <p>제목</p>
              <p>작성일</p>
              <p>조회수</p>
            </div>
            {category && notices.map((item) => (
              <div key={item.id} className='list-content'>
                <p>{item.id}</p>
                <p>
                  <Link to={`/community/notice/${item.id}`}>{item.title}</Link>
                </p>
                <p>{moment(item.date).format('YYYY-MM-DD HH:mm:ss')}</p>
                <p>{item.cnt}</p>
              </div>
            ))}
            {!category && faqs.map((item) => (
              <div key={item.id} className='list-content'>
                <p>{item.id}</p>
                <p>
                  <Link to={`/community/notice/${item.id}`}>
                    [{getCategoryName(item.category_id)}] - {item.title}
                  </Link>
                </p>
                <p>{moment(item.date).format('YYYY-MM-DD HH:mm:ss')}</p>
                <p>{item.cnt}</p>
              </div>
            ))}
          </div>
          {/* 무한 스크롤 혹은 페이지네이션 고민중. */}
        </CommunityLayout>
      </AppLayout>
    </>
  );
}
