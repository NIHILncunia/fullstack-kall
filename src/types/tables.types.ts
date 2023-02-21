export interface IProduct {
  id: number;
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
}

export interface IReview {
  id: number;
  user_id: string;
  order_dnb: number;
  title: string;
  content: string;
  star: number;
  date: string;
}

export interface IReviewComment {
  id: number;
  user_id: string;
  review_nb: number;
  title: string;
  content: string;
  date: string;
}
