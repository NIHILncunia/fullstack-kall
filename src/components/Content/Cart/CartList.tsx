import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { ICart } from '@/types/tables.types';
import { useProductsById } from '@/hooks/queries/product';
import { useCodeTable } from '@/hooks/queries/code.table';

interface ICartlistProps {
  item: ICart;
  selectedItems: number[];
  // eslint-disable-next-line no-unused-vars
  onChangeItemSelect: (itemId: number) => void;
}

export function CartList({ item, selectedItems, onChangeItemSelect, }: ICartlistProps) {
  const product = useProductsById(item.product_id);
  const codeTable = useCodeTable();

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

  return (
    <>
      <div className='list-content'>
        <div>
          <label htmlFor={`cart${item.id}`} className='checkbox'>
            <input
              type='checkbox'
              id={`cart${item.id}`}
              name='cart-item'
              value={`${item?.id}-${product.name}`}
              checked={selectedItems.includes(item?.id)}
              onChange={() => onChangeItemSelect(item?.id)}
              hidden
            />
            <div>
              <FaCheck />
            </div>
          </label>
        </div>
        <div>{itemString}</div>
        <div>{itemTotalPrice}원</div>
      </div>
    </>
  );
}
