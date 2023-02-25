import React, {
  Fragment, useCallback, useEffect, useState
} from 'react';
import { useCookies } from 'react-cookie';
import { FaAngleRight, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { AppLayout } from '@/layouts';
import { useCartByUserId } from '@/hooks/queries/cart';
import { CartList } from '@/components/Content/Cart';
import { Heading2, IsLoding } from '@/components/Content';
import {
  buttonsStyle,
  cartListStyle, cartPageStyle, listStatStyle, orderProgressStyle
} from './style';
import { IOrderDetail } from '@/types/tables.types';

export function Cart() {
  const [ cookies, ] = useCookies([ 'id', ]);
  const cartList = useCartByUserId(cookies.id);
  const navigate = useNavigate();

  const [ selectedItems, setSelectedItems, ] = useState<number[]>([]);
  const [ selectAll, setSelectAll, ] = useState(false);

  const onChangeAllSelect = useCallback(() => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartList.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  }, [ selectAll, cartList, ]);

  const onChangeItemSelect = useCallback((itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([ ...selectedItems, itemId, ]);
    }
  }, [ selectedItems, ]);

  useEffect(() => {
    if (selectedItems.length === cartList?.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [ cartList, selectedItems, ]);

  const totalItemPrice = cartList
    .filter((item) => selectedItems.includes(item.id))
    .map((item) => item.price * item.amount)
    .reduce((pre, crr) => pre + crr, 0);

  const deliveryPrice = 3000;

  const totalPrice = totalItemPrice + deliveryPrice;

  const onClickRemove = useCallback(() => {
  // // 선택된 항목이 없으면 무시
  //   if (selectedItems.length === 0) return;

    //   // 서버에 선택된 항목을 삭제하는 API를 호출하고, 결과를 받아온다.
    //   const result = await deleteSelectedItems(selectedItems);

  //   // 결과가 성공적으로 처리되면, 선택된 항목 리스트에서 삭제한다.
  //   if (result.success) {
  //     setSelectedItems([]);
  //   }
  }, [ selectedItems, ]);

  const onClickSelectOrder = useCallback(() => {
    if (selectedItems.length === 0) {
      return;
    }

    const orderItems: IOrderDetail[] = cartList.filter(
      (item) => selectedItems.includes(item.id)
    ).map((item, index) => {
      // eslint-disable-next-line camelcase
      const { id, user_id, ...orderItem } = item;
      return { id: index + 1, ...orderItem, };
    });

    localStorage.setItem('cartToOrder', JSON.stringify(orderItems));

    console.log('selectedCartItems >> ', orderItems);
    navigate('/order');
  }, [ selectedItems, ]);

  const onClickOrderAll = useCallback(() => {
  // // 장바구니에 있는 모든 항목의 id를 가져온다.
  //   const allItems = cartList.map((item) => item.id);

  //   // 서버에 모든 항목을 주문하는 API를 호출한다.
  //   fetch('/api/orders', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ items: allItems, }),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //       // 주문 성공 시 처리할 로직
  //         console.log('주문 성공');
  //       } else {
  //       // 주문 실패 시 처리할 로직
  //         console.error('주문 실패');
  //       }
  //     })
  //     .catch((error) => {
  //     // 주문 실패 시 처리할 로직
  //       console.error('주문 실패', error);
  //     });
  }, [ cartList, ]);

  return (
    <>
      <AppLayout title='장바구니'>
        <div id='cart-page' css={cartPageStyle}>
          <Heading2>장바구니</Heading2>
          <div className='order-progress' css={orderProgressStyle}>
            <p className='selected'>01 장바구니</p>
            <p>02 주문 / 결제</p>
            <p>03 주문완료</p>
          </div>
          <div className='cart-list' css={cartListStyle}>
            <div className='list-header'>
              <div>
                <label htmlFor='cart0' className='checkbox'>
                  <input
                    type='checkbox'
                    id='cart0'
                    checked={selectAll}
                    onChange={onChangeAllSelect}
                    hidden
                  />
                  <div>
                    <FaCheck />
                  </div>
                </label>
              </div>
              <div>상품 / 옵션 정보</div>
              <div>상품금액</div>
            </div>
            <IsLoding />
            {cartList.map((item) => (
              <Fragment key={item.id}>
                <CartList
                  item={item}
                  selectedItems={selectedItems}
                  onChangeItemSelect={onChangeItemSelect}
                />
              </Fragment>
            ))}
          </div>
          <div className='list-stat' css={listStatStyle}>
            <div className='stat-top'>
              <p>
                상품 총 금액
                <FaAngleRight />
                {totalItemPrice.toLocaleString()}원
              </p>
              <p>
                배송비
                <FaAngleRight />
                {deliveryPrice.toLocaleString()}원
              </p>
            </div>
            <div className='stat-bottom'>
              <p>
                합계
                <FaAngleRight />
                {totalItemPrice ? totalPrice.toLocaleString() : 0}원
              </p>
            </div>
          </div>
          <div className='buttons' css={buttonsStyle}>
            <button onClick={onClickRemove}>선택 항목 삭제</button>
            <button onClick={onClickSelectOrder}>선택 항목 주문</button>
            <button onClick={onClickOrderAll}>모든 항목 주문</button>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
