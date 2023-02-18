import React from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '@/types/tables.typea';
import { ItemRate } from '../../ItemRate';
import { itemStyle } from './style';

interface IProductItemProps {
  item: IProduct;
}

export function ProductItem({ item, }: IProductItemProps) {
  return (
    <>
      <div css={itemStyle}>
        <div className='item-image'>
          <Link to={`/products/${item.id}`}>
            <img src={item.image} alt={item.name} />
          </Link>
        </div>
        <p className='item-name'>
          <Link to={`/products/${item.id}`}>
            <strong>{item.name}</strong>
          </Link>
        </p>
        <p className='item-price'>{item.price.toLocaleString()}원</p>
        <ItemRate rate={item.star} />
      </div>
    </>
  );
}
