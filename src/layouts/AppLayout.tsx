import React from 'react';
import tw, { css } from 'twin.macro';
import { Global } from '@emotion/react';
import {
  Footer, Header, Main, Meta
} from '@/components/Layout';
import { IAppLayoutProps, IMetaData } from '@/types/site.types';

export const AppLayout = ({
  children, title, url, description, keywords, author, image, created, updated, tags, type, section,
}: IAppLayoutProps) => {
  const meta: IMetaData = {
    title,
    url,
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
    * {
      ${tw` p-0 m-0 font-nanum font-[400] box-border `}
    }
  `;

  return (
    <>
      <Global styles={globalStyle} />
      <Meta meta={meta} />
      <Header />

      <Main>
        {children}
      </Main>

      <Footer />
    </>
  );
};
