import React from 'react';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import { IProduct } from '@/types/tables.types';
import { otherItemStyle } from './style';
import { ItemRate } from '../../ItemRate';

interface IOtherItemsProps {
  data: IProduct[];
}

export function OtherItems({ data, }: IOtherItemsProps) {
  return (
    <>
      <div css={otherItemStyle}>
        {data.map((item) => (
          <div key={item.productId}>
            <div className='item-image'>
              <Link to={`/products/${item.categoryDTO.categoryId}/${item.productId}`}>
                <img src={item.image} alt={item.name} />
              </Link>
            </div>
            <div className='item-info'>
              <h4 className='item-name'>
                <Link to={`/products/${item.categoryDTO.categoryId}/${item.productId}`}>
                  <strong>{item.name}</strong>
                </Link>
              </h4>
              <p className='item-price'>
                {item.price?.toLocaleString()}원
              </p>
              <ItemRate rate={item.star} styles={tw`text-[1.4rem]`} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
