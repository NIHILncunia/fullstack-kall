import React, {
  FormEvent, useCallback, useRef, useState
} from 'react';
import { v4 as uuid } from 'uuid';
import { FaTimes } from 'react-icons/fa';
import { useInput } from '@/hooks';
import { ISelect } from '@/types/product.select.types';
import {
  bottomButtonStyle, bottomMessageStyle, countStyle, inputStyle, selectedItemStyle
} from './style';

interface IETCOptionProps {
  name: string;
  price: number;
  items: ISelect[];
  setItems: React.Dispatch<React.SetStateAction<ISelect[]>>;
}

export function ETCOption({
  name, price, items, setItems,
}: IETCOptionProps) {
  const [ amount, setAmount, ] = useState(1);
  const [ isDisabled, setIsDisabled, ] = useState(false);

  const idRef = useRef(1);
  const requestRef = useRef<HTMLInputElement>();
  const request = useInput(requestRef, 'request');

  const onClickMinus = useCallback(() => {
    setAmount((prev) => (prev === 1 ? prev : prev - 1));
  }, []);

  const onClickPlus = useCallback(() => {
    setAmount((prev) => prev + 1);
  }, []);

  const getTotalPrice = () => {
    const getPrices = items.map((item) => item.amount * item.price);
    const totalPrice = getPrices.reduce((pre, crr) => pre + crr, 0);

    return totalPrice;
  };

  const onSubmitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameOption = `${name} - 수량: ${amount}`;
    const requestOption = request.data.value ? `, 요청사항: ${request.data.value}` : '';

    const newItem = `${nameOption}${requestOption}`;

    setIsDisabled(true);
    setItems((prev) => [ ...prev, {
      id: idRef.current++,
      item: newItem,
      amount,
      price,
    }, ]);
  }, [ name, price, amount, request, ]);

  const onClickDelete = useCallback((id: number) => {
    const newData = items.filter((item) => item.id !== id);

    setItems(newData);
    setIsDisabled(false);
  }, [ items, ]);

  return (
    <>
      <div>
        <form onSubmit={onSubmitForm}>
          <div css={countStyle}>
            <span>수량</span>
            <div>
              <button type='button' onClick={onClickMinus}>-</button>
              <input type='number' value={amount} readOnly />
              <button type='button' onClick={onClickPlus}>+</button>
            </div>
          </div>
          <div css={inputStyle}>
            <label htmlFor={request.data.id}>
              <span>추가 요청사항</span>
              <input
                type='text'
                ref={requestRef}
                {...request.data}
                placeholder='방문수령 원하시면 1:1 문의를 이용해주세요.'
              />
            </label>
          </div>
          {
            isDisabled && items.length === 1 ? (
              <p css={bottomMessageStyle}>
                수정 사항이 있으실 경우 선택 항목을 삭제 후 다시 선택해주세요.
              </p>
            ) : (
              <button css={bottomButtonStyle}>선택 완료</button>
            )
          }
        </form>
        <div className='items' css={selectedItemStyle}>
          <p className='count'>선택된 상품 총 {items.length}개</p>
          {items.map((item) => (
            <div key={uuid()}>
              <p>{item.item}</p>
              <p>{item.price?.toLocaleString()}원</p>
              <button aria-label='delete-item' onClick={() => onClickDelete(item.id)}><FaTimes /></button>
            </div>
          ))}
          {items && (
            <p className='total-price'>
              결제 총액(배송비 미포함): {getTotalPrice().toLocaleString()}원
            </p>
          )}
        </div>
      </div>
    </>
  );
}
