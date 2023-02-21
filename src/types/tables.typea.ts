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
