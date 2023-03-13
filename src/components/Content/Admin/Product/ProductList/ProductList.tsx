/* eslint-disable no-alert */
import React, {
  useCallback,
  useEffect, useRef, useState
} from 'react';
import { useNavigate } from 'react-router';
import { IProduct } from '@/types/tables.types';
import { ProductItem } from '../ProductItem/ProductItem';
import { itemCategoryButtonStyle, itemControllButtonStyle, productListStyle } from './style';
import { useProducts } from '@/hooks/trueQuery/product';

export function ProductList() {
  const [ cate, setCate, ] = useState('');
  const [ items, setItems, ] = useState<IProduct[]>([]);
  const [ selectedItems, setSelectedItems, ] = useState<number[]>([]);

  console.log(items);

  const customRef = useRef<HTMLButtonElement>();
  const designRef = useRef<HTMLButtonElement>();
  const etcRef = useRef<HTMLButtonElement>();

  const productData = useProducts();

  const navi = useNavigate();

  // useEffect(() => {
  //   if (productData.length !== 0) {
  //     setItems(productData);
  //   }
  // }, [ productData, ]);

  const onClickAllCheck = useCallback(() => {
    setSelectedItems(productData.map((item) => item.productId));
  }, [ productData, ]);

  const onClickselectedDelete = useCallback(() => {
    // 선택 삭제
    if (selectedItems.length === 0) {
      return;
    }

    const res = window.confirm('정말로 삭제합니까?');
    console.log('삭제할 데이터 아이디 >> ', selectedItems);

    console.log('[DELETE /admin/products, {아이디 배열}]');
  }, [ selectedItems, ]);

  const onClickAllDelete = useCallback(() => {
    // 전체 삭제
    const res = window.confirm('정말로 삭제합니까?');
    const allItems = productData.map((item) => item.productId);
    console.log('삭제할 데이터 아이디 >> ', allItems);

    console.log('[DELETE /admin/products, {아이디 배열}]');
  }, [ productData, ]);

  return (
    <>
      <div css={itemCategoryButtonStyle}>
        <button
          data-cate='custom'
          ref={customRef}
          onClick={() => {
            const selectedData = productData.filter(
              (item) => item.categoryDTO.categoryId === 'custom'
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
              (item) => item.categoryDTO.categoryId === 'design'
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
              (item) => item.categoryDTO.categoryId === 'etc'
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
        <button onClick={onClickAllCheck}>전체 선택</button>
        <button onClick={() => setSelectedItems([])}>선택 취소</button>
        <button onClick={onClickselectedDelete}>선택 삭제</button>
        <button onClick={onClickAllDelete}>전체 삭제</button>
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
          <ProductItem
            key={item?.productId}
            item={item}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        ))}
      </div>
    </>
  );
}
