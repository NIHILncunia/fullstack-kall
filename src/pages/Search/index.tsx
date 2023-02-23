import React from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { AppLayout } from '@/layouts';

export function Search() {
  const location = useLocation();
  const parsed = queryString.parse(location.search);

  console.log(parsed);

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
