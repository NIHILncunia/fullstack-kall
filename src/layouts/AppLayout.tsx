import React from 'react';
import tw, { css } from 'twin.macro';
import { Global } from '@emotion/react';
import { useLocation } from 'react-router';
import {
  Footer, Header, Main, MemoMeta
} from '@/components/Layout';
import { IAppLayoutProps, IMetaData } from '@/types/site.types';
import { IsLoading } from '@/components/Content';

export const AppLayout = ({
  children, title, description, keywords, author, image, created, updated, tags, type, section,
}: IAppLayoutProps) => {
  const location = useLocation();

  const meta: IMetaData = {
    title,
    url: location.pathname,
    description,
    keywords,
    author,
    image,
    tags,
    type,
    section,
    created,
    updated,
  };

  const globalStyle = css`
    :root {
      ${tw` scroll-smooth `}
    }

    * {
      ${tw` p-0 m-0 font-nanum font-[400] box-border `}
    }

    /* 반응형을 위한 개발용 스타일 */
    body {
      ${tw` md:bg-red-50 `}
      ${tw` sm:bg-red-100 `}
      ${tw` xs:bg-red-200 `}
    }

    input {
      ${tw` outline-none `}
    }
  `;

  return (
    <>
      <Global styles={globalStyle} />
      <MemoMeta meta={meta} />
      <Header />

      <Main>
        <IsLoading />
        {children}
      </Main>

      <Footer />
    </>
  );
};
