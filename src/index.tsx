import '@/styles/tailwind.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
  Home, NotFound, SIgnIn, SignUp
} from './pages';

const queryClient = new QueryClient();

const ReduxApp = (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SIgnIn />} />
        <Route path='/signup' element={<SignUp />} />

        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
  </QueryClientProvider>
);

const root = createRoot(document.querySelector('#root'));
root.render(ReduxApp);
