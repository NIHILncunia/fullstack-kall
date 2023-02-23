import { ICart } from './tables.types';

export interface ICartItem extends ICart {
  checked: boolean;
}
