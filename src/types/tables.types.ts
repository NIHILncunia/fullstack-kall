export interface IProduct {
  id?: number;
  category_id?: string;
  name?: string;
  price?: number;
  amount?: number;
  info?: string;
  date?: Date;
  star?: number;
  tag?: string[];
  image?: string;
  cnt?: number;
}

export interface IUser {
  id?: string;
  name?: string;
  password?: string;
  phone_nb?: string;
  email?: string;
  birthday?: string;
  root?: string;
  eventagree?: 'O' | 'X';
  role?: 'user' | 'admin';
  mileage?: number;
  date?: string;
  status?: '활동계정' | '비활동계정';
}

export interface IReview {
  id?: number;
  user_id?: string;
  product_id?: number;
  order_dnb?: number;
  title?: string;
  content?: string;
  star?: number;
  date?: string;
}

export interface IReviewComment {
  id?: number;
  user_id?: string;
  review_nb?: number;
  title?: string;
  content?: string;
  date?: string;
}

export interface ICart {
  id?: number;
  product_id?: number;
  user_id?: string;
  option_sheet?: 'Ost_01' | 'Ost_02' | 'Ost_03';
  option_shape?: 'Osp_01' | 'Osp_02' | 'Osp_03';
  option_cream?: 'Ocrm_01' | 'Ocrm_02' | 'Ocrm_03';
  option_lettering?: string;
  option_size?: 'Osize_01' | 'Osize_02' | 'Osize_03';
  option_image?: string;
  amount?: number;
  price?: number;
}

export interface IOrderDetail {
  id?: number;
  order_id?: number;
  product_id?: number;
  option_sheet?: 'Ost_01' | 'Ost_02' | 'Ost_03';
  option_shape?: 'Osp_01' | 'Osp_02' | 'Osp_03';
  option_cream?: 'Ocrm_01' | 'Ocrm_02' | 'Ocrm_03';
  option_lettering?: string;
  option_size?: 'Osize_01' | 'Osize_02' | 'Osize_03';
  option_image?: string;
  amount?: number;
  price?: number;
}

export interface IOrder {
  id?: number;
  user_id?: string;
  name?: string;
  zip_code?: string;
  address_1?: string;
  address_2?: string;
  phone_nb?: string;
  request?: string;
  date?: string;
  mileage?: number;
  order_status?: string;
  price?: number;
  payment?: string;
}

export interface IAddress {
  id?: number;
  user_id?: string;
  name?: string;
  address_name?: string;
  phone_nb?: string;
  zip_code?: string;
  address_1?: string;
  address_2?: string;
  status?: string;
}

export interface ICategory {
  id?: string;
  category_name?: string;
}

export interface INotice {
  id?: number;
  category_id?: string;
  title?: string;
  content?: string;
  date?: string;
  cnt?: number;
}

export interface IDirect {
  id?: number;
  user_id?: string;
  category_id?: string;
  title?: string;
  content?: string;
  comment?: string;
  date?: string;
}

export interface IUserDel {
  user_id?: string;
  text?: string;
  date?: string;
}
