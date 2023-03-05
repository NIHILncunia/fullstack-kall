import '@/styles/tailwind.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
  Agreement,
  Cart,
  CommunityArticle,
  CommunityDirect,
  CommunityReview,
  CommunityVisit,
  FindId,
  FindPassword,
  Home, MyaPagePassEdit, MyPageAddress, MyPageMain, MyPageUserInfoEdit, NotFound, NoticeaArticle, Order, OrderComplete, Privacy, ProductItem, Products, ReviewArticle, Search, SIgnIn, SignUp, WithDrawal
} from './pages';
import {
  AdminMain, ProductCreate, ProductEdit, ProductManagement, UserEditForm, UserManagement
} from './pages/Admin';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000,
      refetchInterval: 900000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onError() {
        console.log('안타깝게도 에러를 만났습니다!');
      },
    },
    mutations: {
      onError() {
        console.log('안타깝게도 에러를 만났습니다!');
      },
    },
  },
});

const QueryApp = (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        {/* 어드민 */}
        {/* <Route path='/admin' element={} /> */}
        <Route path='/admin' element={<AdminMain />} />
        <Route path='/admin/users' element={<UserManagement />} />
        <Route path='/admin/users/edit' element={<UserEditForm />} />
        <Route path='/admin/products' element={<ProductManagement />} />
        <Route path='/admin/products/:id/edit' element={<ProductEdit />} />
        <Route path='/admin/products/create' element={<ProductCreate />} />

        {/* 홈페이지 */}
        <Route path='/' element={<Home />} />

        {/* 개인정보처리방침 / 이용약관 */}
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/agreement' element={<Agreement />} />

        {/* 로그인 / 회원가입 */}
        <Route path='/signin' element={<SIgnIn />} />
        <Route path='/signup' element={<SignUp />} />

        {/* 아이디 찾기 / 비밀번호 찾기 */}
        <Route path='/find/id' element={<FindId />} />
        <Route path='/find/password' element={<FindPassword />} />

        {/* 마이페이지 */}
        <Route path='/mypage/main' element={<MyPageMain />} />
        <Route path='/mypage/edit' element={<MyPageUserInfoEdit />} />
        <Route path='/withdrawal' element={<WithDrawal />} />
        <Route path='/mypage/passedit' element={<MyaPagePassEdit />} />
        <Route path='/mypage/address' element={<MyPageAddress />} />

        <Route path='/mypage/mileage' />
        <Route path='/mypage/delivery' />
        <Route path='/mypage/order' />
        <Route path='/mypage/review' />
        <Route path='/mypage/question' />
        <Route path='/mypage/wishlist' />

        {/* 커뮤니티 페이지 */}
        <Route path='/community/notice' element={<CommunityArticle title='공지사항' category='notice' />} />
        <Route path='/community/faq' element={<CommunityArticle title='FAQ' />} />
        <Route path='/community/direct' element={<CommunityDirect />} />
        <Route path='/community/visit' element={<CommunityVisit />} />
        <Route path='/community/review' element={<CommunityReview />} />
        <Route path='/community/notice/:id' element={<NoticeaArticle />} />
        <Route path='/community/review/:id' element={<ReviewArticle />} />

        {/* 상품 리스트 / 상품 상세 페이지 */}
        <Route path='/products/custom' element={<Products category='custom' />} />
        <Route path='/products/design' element={<Products category='design' />} />
        <Route path='/products/etc' element={<Products category='etc' />} />
        <Route path='/products/:category/:id' element={<ProductItem />} />

        {/* 장바구니 / 결제 */}
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order />} />
        <Route path='/order/complete' element={<OrderComplete />} />

        {/* 검색 결과 페이지 */}
        <Route path='/search' element={<Search />} />

        {/* 없는 페이지는 여기로 */}
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-left' />
  </QueryClientProvider>
);

const root = createRoot(document.querySelector('#root'));
root.render(QueryApp);
