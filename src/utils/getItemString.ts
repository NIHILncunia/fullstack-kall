import {
  ICart, ICodeTable, IOrderDetail, IProduct
} from '@/types/tables.types';

export const getItemString = (codeTable: ICodeTable, product: IProduct, item: (ICart | IOrderDetail)) => {
  let nameOption: string;

  switch (product.category_id) {
    case 'custom':
      nameOption = `${product.name} - 시트: ${codeTable[item?.option_sheet]}, 모양: ${codeTable[item?.option_shape]}, 크림: ${codeTable[item?.option_cream]}, 수량: ${item?.amount}`;
      break;
    case 'design':
      nameOption = `${product.name} - 크기: ${codeTable[item?.option_size]}, 수량: ${item?.amount}`;
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
