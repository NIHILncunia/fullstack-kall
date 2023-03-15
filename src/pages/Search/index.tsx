import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { useCookies } from 'react-cookie';
import { AppLayout } from '@/layouts';
import { kallInstance } from '@/data/axios.data';
import { IProduct } from '@/types/tables.types';
import { Heading2 } from '@/components/Content';

interface QueryString {
  keyword?: string;
}

export function Search() {
  const [ products, setProducts, ] = useState<IProduct[]>([]);
  const location = useLocation();
  const { keyword, } = queryString.parse(location.search) as QueryString;

  useEffect(() => {
    kallInstance.get<IProduct[]>(`/products?keyword=${keyword}`)
      .then((res) => {
        if (keyword) {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ keyword, ]);

  console.log('검색된 상품 >> ', products);
  console.log('검색어', keyword);

  return (
    <>
      <AppLayout title={location.search}>
        <div id='search-page'>
          <Heading2>{`'${keyword}'`} 관련 상품 검색 결과 총 {products.length}건</Heading2>

          {products.length === 0 && (
            <div>
              <p>검색된 결과가 없습니다. 다른 검색어를 입력해보세요.</p>
            </div>
          )}
        </div>
      </AppLayout>
    </>
  );
}
