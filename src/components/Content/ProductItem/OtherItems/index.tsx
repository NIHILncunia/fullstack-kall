import React from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '@/types/tables.types';
import { ItemRate } from '../../ItemRate';

interface IOtherItemsProps {
  data: IProduct[];
}

export function OtherItems({ data, }: IOtherItemsProps) {
  return (
    <>
      <div>
        {data.map((item) => (
          <div key={item.id}>
            <div className='item-image'>
              <Link to={`/products/${item.category_id}/${item.id}`}>
                <img src={item.image} alt={item.name} />
              </Link>
            </div>
            <div className='item-info'>
              <h4 className='item-name'>{item.name}</h4>
              <p className='item-price'>
                {item.price?.toLocaleString()}원
              </p>
              <ItemRate rate={item.star} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
