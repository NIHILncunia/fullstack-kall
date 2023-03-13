export interface IProduct {
  productId?: number;
  categoryDTO?: ICategory;
  name?: string;
  price?: number;
  amount?: number;
  info?: string;
  date?: Date;
  star?: number;
  tag?: string;
  image?: string;
  cnt?: number;
}

export interface IUser {
  userId?: string;
  name?: string;
  password?: string;
  phoneNb?: string;
  email?: string;
  birthday?: string;
  root?: string;
  eventagree?: 'O' | 'X';
  role?: 'user' | 'admin';
  mileage?: number;
  date?: string;
  status?: '활동계정' | '비활동계정' | '탈퇴계정';
}

export interface IReview {
  reviewId?: number;
  userDTO?: IUser;
  productDTO?: IProduct;
  orderDetailDTO?: IOrderDetail;
  title?: string;
  content?: string;
  image1?: string;
  image2?: string;
  star?: number;
  date?: string;
}

export interface IReviewComment {
  reviewCmtId?: number;
  userDTO?: IUser;
  reviewDTO?: IReview;
  title?: string;
  content?: string;
  date?: string;
}

export interface ICart {
  cartId?: number;
  productDTO?: IProduct;
  userDTO?: IUser;
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
  orderDNb?: number;
  orderDTO?: IOrder;
  productDTO?: IProduct;
  option_sheet?: 'Ost_01' | 'Ost_02' | 'Ost_03';
  option_shape?: 'Osp_01' | 'Osp_02' | 'Osp_03';
  option_cream?: 'Ocrm_01' | 'Ocrm_02' | 'Ocrm_03';
  option_lettering?: string;
  option_size?: 'Osize_01' | 'Osize_02' | 'Osize_03';
  option_image?: string;
  amount?: number;
  status?: string;
  price?: number;
}

export interface IOrder {
  orderId?: number;
  userDTO?: IUser;
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
  usAddressId?: number;
  userDTO?: IUser;
  name?: string;
  addressName?: string;
  phone_nb?: string;
  zip_code?: string;
  address_1?: string;
  address_2?: string;
  status?: string;
}

export interface ICategory {
  categoryId?: string;
  categoryName?: string;
}

export interface INotice {
  noticeId?: number;
  categoryDTO?: ICategory;
  title?: string;
  content?: string;
  date?: string;
  cnt?: number;
}

export interface IDirect {
  usQId?: number;
  userDTO?: IUser;
  categoryDTO?: ICategory;
  title?: string;
  content?: string;
  comment?: string;
  date1?: string;
  date2?: string;
}

export interface IUserDel {
  userId?: string;
  text?: string;
  date?: string;
}

export interface IRefund {
  refundId?: number;
  orderDetailDTO?: IOrderDetail;
  userDTO?: IUser;
  title?: string;
  content?: string;
  image_1?: string;
  image_2?: string;
  status?: string;
  date?: string;
}

export interface IQuestion {
  productQId?: number;
  productDTO?: IProduct;
  userDTO?: IUser;
  title?: string;
  content?: string;
  comment?: string;
  date1?: string;
  date2?: string;
}

export interface IWish {
  wishListId?: number;
  userDTO?: IUser;
  productDTO?: IProduct;
  date?: string;
}

export interface IProductImage {
  productimgid?: number;
  productDTO?: IProduct;
  oriImgName?: string;
  imgUrl?: string;
  imgName?: string;
}
