import { ISelect } from '@/types/product.select.types';
import {
  ICart, IOrderDetail, IProduct
} from '@/types/tables.types';

interface ISelection {
  sheet: string;
  shape: string;
  cream: string;
  size: string;
}

export const getItemString = (selection: ISelection, product: IProduct, item: (ICart | IOrderDetail | ISelect)) => {
  let nameOption: string;

  switch (product?.categoryDTO?.categoryId) {
    case 'custom':
      nameOption = `${product.name} - 시트: ${selection.sheet}, 모양: ${selection.shape}, 크림: ${selection.cream}, 수량: ${item?.amount}`;
      break;
    case 'design':
      nameOption = `${product.name} - 크기: ${selection.size}, 수량: ${item?.amount}`;
      break;
    case 'etc':
      nameOption = `${product.name} - 수량: ${item?.amount}`;
      break;
    default:
      break;
  }

  const letterOption = item?.option_lettering ? `, 문구: ${item?.option_lettering}` : '';
  const itemTotalPrice = (item.amount * item.price).toLocaleString();

  const itemString = `${nameOption}${letterOption}`;

  return { itemString, itemTotalPrice, };
};
