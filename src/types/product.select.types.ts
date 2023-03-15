import { IProduct, IUser } from './tables.types';

export interface ISelect {
  selectId?: number;
  userDTO?: IUser;
  productDTO?: IProduct;
  name?: string;
  option_sheet?: string;
  option_shape?: string;
  option_cream?: string;
  option_size?: string;
  option_lettering?: string;
  option_image?: string;
  request?: string;
  word?: string;
  price?: number;
  amount?: number;
}
