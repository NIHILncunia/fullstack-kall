export interface IProduct {
  id?: number;
  category_id: string;
  name: string;
  price: number;
  amount: number;
  info: string;
  date: Date;
  star: number;
  tag: string[];
  image: string;
  cnt: number;
}

export interface IUser {
  id: string;
  name: string;
  password: string;
  phone_nb: string;
  email: string;
  birthday: string;
  root: string;
  eventagree: 'O' | 'X';
  role: 'user' | 'admin';
  mileage: number;
  date: string;
  status: 'active' | 'inactive';
}

export interface IReview {
  id?: number;
  user_id: string;
  order_dnb: number;
  title: string;
  content: string;
  star: number;
  date: string;
}

export interface IReviewComment {
  id?: number;
  user_id: string;
  review_nb: number;
  title: string;
  content: string;
  date: string;
}

export interface ICart {
  id?: number;
  product_id: number;
  user_id: string;
  option_sheet?: 'Ost_01' | 'Ost_02' | 'Ost_03';
  option_shape?: 'Osp_01' | 'Osp_02' | 'Osp_03';
  option_cream?: 'Ocrm_01' | 'Ocrm_02' | 'Ocrm_03';
  option_lettering?: string;
  option_size?: 'Osize_01' | 'Osize_02' | 'Osize_03';
  option_image?: string;
  amount: number;
  price: number;
}

export interface IOrderDetail {
  id?: number;
  order_id?: number;
  product_id: number;
  option_sheet?: 'Ost_01' | 'Ost_02' | 'Ost_03';
  option_shape?: 'Osp_01' | 'Osp_02' | 'Osp_03';
  option_cream?: 'Ocrm_01' | 'Ocrm_02' | 'Ocrm_03';
  option_lettering?: string;
  option_size?: 'Osize_01' | 'Osize_02' | 'Osize_03';
  option_image?: string;
  amount: number;
  price: number;
}

export interface IOrder {
  id?: number;
  user_id: string;
  name: string;
  zip_code: string;
  address_1: string;
  address_2: string;
  phone_nb: string;
  request: string;
  date: string;
  mileage: number;
  price: number;
  payment: string;
}

export interface IAddress {
  id: number;
  user_id: string;
  name: string;
  address_name: string;
  phone_nb: string;
  zip_code: string;
  address_1: string;
  address_2: string;
}

export interface ICategory {
  id: string;
  category_name: string;
}

export interface INotice {
  id: number;
  category_id: string;
  title: string;
  content: string;
  date: string;
  cnt: number;
}

export interface IDirect {
  id?: number;
  user_id: string;
  category_id: string;
  title: string;
  content: string;
  comment: string;
  date?: string;
}

export interface ICodeTable {
  'Ost_01': '일반',
  'Ost_02': '레드벨벳',
  'Ost_03': '블루베리',
  'Osp_01': '원형',
  'Osp_02': '사각형',
  'Osp_03': '하트',
  'Ocrm_01': '크림',
  'Ocrm_02': '빨강',
  'Ocrm_03': '초코',
  'Osize_01': '1호',
  'Osize_02': '2호',
  'Osize_03': '3호',
  'q_01': '로그인/계정',
  'q_02': '배송',
  'q_03': '결제',
  'q_04': '기타',
  'notice': '공지사항',
  'faq_01': 'FAQ(로그인)',
  'faq_02': 'FAQ(배송)',
  'faq_03': 'FAQ(결제)',
  'faq_04': 'FAQ(기타)'
}
