import React from 'react';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import { IProduct } from '@/types/tables.types';
import { ItemRate } from '../../ItemRate';
import { itemStyle } from './style';

interface IProductGridItemProps {
  item: IProduct;
}

export function ProductGridItem({ item, }: IProductGridItemProps) {
  return (
    <>
      <div css={itemStyle}>
        <div className='item-image'>
          <Link to={`/products/${item.categoryDTO.categoryId}/${item.productId}`}>
            <img src={item.image} alt={item.name} />
          </Link>
        </div>
        <p className='item-name'>
          <Link to={`/products/${item.categoryDTO.categoryId}/${item.productId}`}>
            <strong>{item.name}</strong>
          </Link>
        </p>
        <p className='item-price'>{item.price.toLocaleString()}원</p>
        <ItemRate rate={item.star} styles={tw`text-[1.4rem]`} />
      </div>
    </>
  );
}
