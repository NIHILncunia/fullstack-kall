import React, { useCallback, useRef, useState } from 'react';
import { AdminLayout, AppLayout } from '@/layouts';
import { Heading2, Heading3 } from '@/components/Content';
import { useInput } from '@/hooks';
import { basicInfoUploadStyle, imageUploadStyle } from './style';
import { IProduct } from '@/types/tables.types';
import { useCreateProduct } from '@/hooks/trueQuery/product';

export function ProductCreate() {
  const [ file, setFile, ] = useState([]);
  const createProduct = useCreateProduct();

  const imageRef = useRef<HTMLInputElement>();
  const fileRef = useRef<HTMLInputElement>();

  const nameRef = useRef<HTMLInputElement>();
  const tagRef = useRef<HTMLInputElement>();
  const infoRef = useRef<HTMLInputElement>();
  const amountRef = useRef<HTMLInputElement>();
  const priceRef = useRef<HTMLInputElement>();
  const categoryRef = useRef<HTMLInputElement>();

  const image = useInput(imageRef, 'image');

  const name = useInput(nameRef, 'name');
  const tag = useInput(tagRef, 'tag');
  const info = useInput(infoRef, 'info');
  const amount = useInput(amountRef, 'amount');
  const price = useInput(priceRef, 'price');
  const category = useInput(categoryRef, 'category');

  const onChangeFile = useCallback(() => {
    const file = fileRef.current.files;

    image.setValue(file[0].name);
    setFile([ ...file, ]);
  }, [ fileRef, ]);

  interface ICreateProduct {
    productData: IProduct;
    formData: FormData;
  }

  const onClickCreateProduct = useCallback(() => {
    const formData = new FormData();

    formData.append('file', file[0]);

    const productData: IProduct = {
      category_id: category.data.value,
      name: name.data.value,
      info: info.data.value,
      tag: tag.data.value.split(','),
      price: Number(price.data.value),
    };

    const createData: ICreateProduct = {
      productData, formData,
    };

    console.log(createData);
    createProduct.mutate(createData);
  }, [ file, ]);

  return (
    <>
      <AppLayout title='상품 등록'>
        <AdminLayout pageId='admin-product-create-page'>
          <Heading2>상품 등록</Heading2>

          <Heading3>이미지</Heading3>
          <div className='image-upload' css={imageUploadStyle}>
            <img src={image.data.value} alt={name.data.value} />
            <div>
              <input type='file' hidden ref={fileRef} onChange={onChangeFile} />
              <input type='text' ref={imageRef} {...image.data} />
              <button type='button' onClick={() => fileRef.current.click()}>이미지 등록</button>
            </div>
          </div>

          <Heading3>기본정보</Heading3>
          <div className='basic-info-edit' css={basicInfoUploadStyle}>
            <label htmlFor='name'>
              <span>상품 이름</span>
              <input type='text' ref={nameRef} {...name.data} />
            </label>
            <label htmlFor='category'>
              <span>카테고리</span>
              <input type='text' list='list' ref={categoryRef} {...category.data} />
              <datalist id='list'>
                <option value='custom'>주문제작 케이크</option>
                <option value='design'>디자인 케이크</option>
                <option value='etc'>ETC</option>
              </datalist>
            </label>
            <label htmlFor='info'>
              <span>상세 설명</span>
              <input type='text' ref={infoRef} {...info.data} />
            </label>
            <label htmlFor='tag'>
              <span>태그</span>
              <input type='text' ref={tagRef} {...tag.data} />
            </label>
            <label htmlFor='amount'>
              <span>재고</span>
              <input type='text' ref={amountRef} {...amount.data} />
            </label>
            <label htmlFor='price'>
              <span>가격</span>
              <input type='text' ref={priceRef} {...price.data} />
            </label>
          </div>

          <div>
            <button type='button' onClick={onClickCreateProduct}>상품 등록</button>
          </div>
        </AdminLayout>
      </AppLayout>
    </>
  );
}
