import React, {
  ChangeEvent, FormEvent, useCallback, useRef, useState
} from 'react';
import { v4 as uuid } from 'uuid';
import { useInput } from '@/hooks';
import { sizeData } from '@/data/checkbox.data';
import { ISelect } from '@/types/product.select.types';
import { SelectItem } from '../SelectItem';
import {
  inputStyle, radioStyle, selectButton, selectedItemStyle
} from './style';

interface IDesignOptionProps {
  name: string;
  price: number;
  items: ISelect[];
  setItems: React.Dispatch<React.SetStateAction<ISelect[]>>;
}

export function DesignOption({
  name, price, items, setItems,
}: IDesignOptionProps) {
  const [ size, setSize, ] = useState(sizeData[0].value);
  const [ sizeLabel, setSizeLabel, ] = useState(sizeData[0].label);
  const idRef = useRef(1);

  const requestRef = useRef<HTMLInputElement>();
  const request = useInput(requestRef, 'request');

  const onChangeSheet = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
    setSizeLabel(event.target.id);
  }, []);

  const getTotalPrice = () => {
    const getPrices = items.map((item) => item.amount * item.price);
    const totalPrice = getPrices.reduce((pre, crr) => pre + crr, 0);

    return totalPrice;
  };

  const onSubmitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameOption = `${name} - 크기: ${sizeLabel}`;
    const requestOption = request.value ? `, 요청사항: ${request.value}` : '';

    const newItem = `${nameOption}${requestOption}`;

    // 이 부분에 POST [/order] 처리 필요함.

    setItems((prev) => [ ...prev, {
      id: idRef.current++,
      item: newItem,
      price,
      amount: 1,
    }, ]);
  }, [ name, price, sizeLabel, request.value, ]);

  return (
    <>
      <div>
        <form onSubmit={onSubmitForm}>
          <div css={radioStyle}>
            <p>크기</p>
            <div>
              {sizeData.map((item) => (
                <label key={item.value} htmlFor={item.label}>
                  <input
                    type='radio'
                    name='size'
                    id={item.label}
                    value={item.value}
                    onChange={onChangeSheet}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div css={inputStyle}>
            <label htmlFor={request.id}>
              <span>추가 요청사항</span>
              <input
                type='text'
                ref={requestRef}
                {...request}
                placeholder='방문수령 원하시면 1:1 문의를 이용해주세요.'
              />
            </label>
          </div>
          <button css={selectButton}>선택 완료</button>
        </form>
        <div className='items' css={selectedItemStyle}>
          <p className='count'>선택된 상품 총 {items.length}개</p>
          {items.map((item) => (
            <SelectItem key={uuid()} id={item.id} item={item} items={items} setItems={setItems} />
          ))}
          <p className='total-price'>결제 총액(배송비 미포함): {getTotalPrice().toLocaleString()}원</p>
        </div>
      </div>
    </>
  );
}
