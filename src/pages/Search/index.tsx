import React from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { AppLayout } from '@/layouts';

interface QueryString {
  keyword?: string;
}

export function Search() {
  const location = useLocation();
  const parsed = queryString.parse(location.search) as QueryString;

  console.log(parsed.keyword);

  return (
    <>
      <AppLayout title={location.search}>
        <div id='search-page'>
          검색 결과 페이지
        </div>
      </AppLayout>
    </>
  );
}
