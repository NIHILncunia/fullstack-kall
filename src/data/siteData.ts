import { ISiteData } from '@/types/site.types';

export const siteData: ISiteData = {
  title: 'KALL',
  url: process.env.NODE_ENV !== 'production'
    ? 'https://localhost:3000'
    : '',
  image: '',
  author: 'NIHILncunia',
  description: '주문제작 케이크를 판매하는 KALL입니다.',
  keywords: '케이크,주문제작,cake',
  type: 'website',
  version: 'v0.0.0',
};
