import '@/styles/tailwind.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
  FindId,
  FindPassword,
  Home, NotFound, ProductItem, Products, SIgnIn, SignUp
} from './pages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: () => {
        console.log('안타깝게도 에러를 만났습니다!');
      },
    },
  },
});

const ReduxApp = (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        {/* 홈페이지 */}
        <Route path='/' element={<Home />} />

        {/* 로그인 / 회원가입 */}
        <Route path='/signin' element={<SIgnIn />} />
        <Route path='/signup' element={<SignUp />} />

        {/* 아이디 찾기 / 비밀번호 찾기 */}
        <Route path='/find/id' element={<FindId />} />
        <Route path='/find/password' element={<FindPassword />} />

        {/* 상품 리스트 */}
        <Route path='/products/custom' element={<Products category='custom' />} />
        <Route path='/products/design' element={<Products category='design' />} />
        <Route path='/products/etc' element={<Products category='etc' />} />

        {/* 상품 상세 페이지 */}
        <Route path='/products/:category/:id' element={<ProductItem />} />

        {/* 없는 페이지는 여기로 */}
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
  </QueryClientProvider>
);

const root = createRoot(document.querySelector('#root'));
root.render(ReduxApp);
