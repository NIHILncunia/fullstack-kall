import { ICart } from './tables.types';

export interface ICartItem extends ICart {
  checked: boolean;
}

export interface IUsersDeleteResponse {
  deleted: number;
}

export interface IQueryOptions {
  enabled: boolean;
}
