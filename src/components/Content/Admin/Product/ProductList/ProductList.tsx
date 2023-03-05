import React, {
  useEffect, useRef, useState
} from 'react';
import { useNavigate } from 'react-router';
import { useProducts } from '@/hooks/queries/product';
import { IProduct } from '@/types/tables.types';
import { ProductItem } from '../ProductItem/ProductItem';
import { itemCategoryButtonStyle, itemControllButtonStyle, productListStyle } from './style';

export function ProductList() {
  const [ cate, setCate, ] = useState('');
  const [ items, setItems, ] = useState<IProduct[]>([]);

  const customRef = useRef<HTMLButtonElement>();
  const designRef = useRef<HTMLButtonElement>();
  const etcRef = useRef<HTMLButtonElement>();

  const productData = useProducts();

  const navi = useNavigate();

  useEffect(() => {
    if (productData.length !== 0) {
      setItems(productData);
    }
  }, [ productData, ]);

  console.log(cate);

  return (
    <>
      <div css={itemCategoryButtonStyle}>
        <button
          data-cate='custom'
          ref={customRef}
          onClick={() => {
            const selectedData = productData.filter(
              (item) => item.category_id === 'custom'
            );
            setCate('custom');
            setItems(selectedData);
          }}
        >
          주문제작 케이크
        </button>
        <button
          data-cate='design'
          ref={designRef}
          onClick={() => {
            const selectedData = productData.filter(
              (item) => item.category_id === 'design'
            );
            setCate('design');
            setItems(selectedData);
          }}
        >
          디자인 케이크
        </button>
        <button
          data-cate='etc'
          ref={etcRef}
          onClick={() => {
            const selectedData = productData.filter(
              (item) => item.category_id === 'etc'
            );
            setCate('etc');
            setItems(selectedData);
          }}
        >
          ETC
        </button>
        <button onClick={() => {
          setCate('');
          setItems(productData);
        }}
        >
          전체 보기
        </button>
      </div>
      <div css={itemControllButtonStyle}>
        <button onClick={() => navi('/admin/products/create')}>상품 등록</button>
        <button>전체 선택</button>
        <button>선택 취소</button>
        <button>선택 삭제</button>
        <button>전체 삭제</button>
      </div>
      <div css={productListStyle}>
        <div className='list-header'>
          <div>선택</div>
          <div>분류</div>
          <div>상품 이름</div>
          <div>재고</div>
          <div>가격</div>
        </div>
        {items?.map((item) => (
          <ProductItem key={item?.id} item={item} />
        ))}
      </div>
    </>
  );
}
