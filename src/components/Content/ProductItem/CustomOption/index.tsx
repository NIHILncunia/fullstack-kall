import React, {
  ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState
} from 'react';
import { v4 as uuid } from 'uuid';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router';
import { useInput } from '@/hooks';
import { creamData, shapeData, sheetData } from '@/data/select.data';
import { ISelect } from '@/types/product.select.types';
import { SelectItem } from '../SelectItem';
import {
  fileInputStyle, inputStyle, radioStyle, selectButton, selectedItemStyle
} from './style';
import { ICart } from '@/types/tables.types';

interface ICustomOptionProps {
  name: string;
  price: number;
  items: ISelect[];
  setItems: React.Dispatch<React.SetStateAction<ISelect[]>>;
}

export function CustomOption({
  name, price, items, setItems,
}: ICustomOptionProps) {
  const [ cookies, ] = useCookies([ 'id', ]);
  const { pathname, } = useLocation();

  const [ sheet, setSheet, ] = useState(sheetData[0].value);
  const [ sheetLabel, setSheetLabel, ] = useState(sheetData[0].label);
  const [ shape, setShape, ] = useState(shapeData[0].value);
  const [ shapeLabel, setShapeLabel, ] = useState(shapeData[0].label);
  const [ cream, setCream, ] = useState(creamData[0].value);
  const [ creamLabel, setCreamLabel, ] = useState(creamData[0].label);
  const fileRef = useRef<HTMLInputElement>();
  const [ file, setFile, ] = useState('');

  const sheetRef = useRef<HTMLInputElement[]>([]);
  const shapeRef = useRef<HTMLInputElement[]>([]);
  const creamRef = useRef<HTMLInputElement[]>([]);

  console.log(sheetRef);

  const wordRef = useRef<HTMLInputElement>();
  const requestRef = useRef<HTMLInputElement>();
  const idRef = useRef(1);

  const word = useInput(wordRef, 'word');
  const request = useInput(requestRef, 'request');

  const onChangeSheet = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSheet(event.target.value);
    setSheetLabel(event.target.id);
  }, []);

  const onChangeShape = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setShape(event.target.value);
    setShapeLabel(event.target.id);
  }, []);

  const onChangeCream = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCream(event.target.value);
    setCreamLabel(event.target.id);
  }, []);

  const onCLickFileSelect = useCallback(() => {
    fileRef.current.click();
  }, [ fileRef, ]);

  const getTotalPrice = () => {
    const getPrices = items.map((item) => item.amount * item.price);
    const totalPrice = getPrices.reduce((pre, crr) => pre + crr, 0);

    return totalPrice;
  };

  const onSubmitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameOption = `${name} - ${sheetLabel}, ${shapeLabel}, ${creamLabel}`;
    const wordOption = word.data.value ? `, 문구: ${word.data.value}` : '';
    const requestOption = request.data.value ? `, 요청사항: ${request.data.value}` : '';

    const newItem = `${nameOption}${wordOption}${requestOption}`;

    setItems((prev) => [ ...prev, {
      id: idRef.current++,
      item: newItem,
      price,
      amount: 1,
    }, ]);
  }, [ name, price, sheetLabel, shapeLabel, creamLabel, word.data.value, request.data.value, ]);

  useEffect(() => {
    word.setValue('');
    setFile('');
    request.setValue('');
    setSheet(sheetData[0].value);
    setSheetLabel(sheetData[0].label);
    setShape(shapeData[0].value);
    setShapeLabel(shapeData[0].label);
    setCream(creamData[0].value);
    setCreamLabel(creamData[0].label);

    wordRef.current.value = '';
    requestRef.current.value = '';
    fileRef.current.value = '';
    idRef.current = 1;
  }, [ pathname, ]);

  return (
    <>
      <div>
        <form onSubmit={onSubmitForm}>
          <div css={radioStyle}>
            <p>시트</p>
            <div>
              {sheetData.map((item, index) => (
                <label key={item.value} htmlFor={item.label}>
                  <input
                    type='radio'
                    name='sheet'
                    id={item.label}
                    value={item.value}
                    onChange={onChangeSheet}
                    ref={(element) => { sheetRef.current[index] = element; }}
                    checked={item.value === sheet}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div css={radioStyle}>
            <p>모양</p>
            <div>
              {shapeData.map((item, index) => (
                <label key={item.value} htmlFor={item.label}>
                  <input
                    type='radio'
                    name='shape'
                    id={item.label}
                    value={item.value}
                    onChange={onChangeShape}
                    ref={(element) => { shapeRef.current[index] = element; }}
                    checked={item.value === shape}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div css={radioStyle}>
            <p>크림</p>
            <div>
              {creamData.map((item, index) => (
                <label key={item.value} htmlFor={item.label}>
                  <input
                    type='radio'
                    name='cream'
                    id={item.label}
                    value={item.value}
                    onChange={onChangeCream}
                    ref={(element) => { creamRef.current[index] = element; }}
                    checked={item.value === cream}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div css={inputStyle}>
            <label htmlFor={word.data.id}>
              <span>원하는 문구를 입력하세요.</span>
              <input
                type='text'
                ref={wordRef}
                {...word.data}
                placeholder='한글은 12글자 영어는 15글자 가능합니다.'
              />
            </label>
          </div>
          <div css={fileInputStyle}>
            <span>이미지 업로드</span>
            <input
              type='file'
              id=''
              ref={fileRef}
              hidden
              onChange={(e) => {
                setFile(e.target.files[0].name);
              }}
            />
            <div>
              <input
                type='text'
                readOnly
                value={file}
              />
              <button type='button' onClick={onCLickFileSelect}>파일 찾기</button>
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
          <p className='text-red-500 font-[900]'>
            선택하지 않을 시 기본값(각 항목의 첫번째 값)으로 주문됩니다.
          </p>
          <button css={selectButton}>선택 완료</button>
        </form>
        <div className='items' css={selectedItemStyle}>
          <p className='count'>선택된 상품 총 {items.length}개</p>
          {items.map((item) => (
            <SelectItem key={uuid()} id={item.id} item={item} items={items} setItems={setItems} />
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
