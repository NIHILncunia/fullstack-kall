import axios from 'axios';
import { IProduct, IUser } from '@/types/tables.typea';

/** 모든 상품을 가져옴 */
export const getProducts = async () => {
  const res = await axios.get<IProduct[]>('/json/products.json');
  const { data, } = res;

  return data;
};

/** 최신순으로 6개의 상품을 가져옴. 홈페이지 용 */
export const getProductsHome = async () => {
  const res = await axios.get<IProduct[]>('/json/products.json');
  const { data, } = res;

  return data
    .slice(0, 6)
    .sort((a, b) => {
      const beforeDate = new Date(a.date).getTime();
      const afterDate = new Date(b.date).getTime();

      return afterDate - beforeDate;
    });
};

/** 카테고리별로 상품을 가져옴 */
export const getProductsByCategory = async (category: string) => {
  const res = await axios.get<IProduct[]>('/json/products.json');
  const { data, } = res;

  return data.filter((item) => item.category_id === category);
};

/** 특정 상품 정보를 가져옴 */
export const getProduct = async (id: number) => {
  const res = await axios.get<IProduct[]>('/json/products.json');
  const { data, } = res;
  const [ product, ] = data.filter((item) => item.id === id);

  return product;
};

/** 모든 유저 정보를 가져옴 */
export const getUsers = async () => {
  const res = await axios.get<IUser[]>(`/json//users.json`);

  return res.data;
};

/** 특정 유저의 정보를 가져옴 */
export const getUser = async (id: string) => {
  const res = await axios.get<IUser[]>(`/json//users.json`);
  const { data, } = res;
  const [ user, ] = data.filter((item) => item.id === id);

  return user;
};
