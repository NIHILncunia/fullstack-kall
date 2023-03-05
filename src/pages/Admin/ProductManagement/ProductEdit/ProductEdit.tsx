import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import { useParams } from 'react-router';
import { FaTimes } from 'react-icons/fa';
import { AdminLayout, AppLayout } from '@/layouts';
import { useProductsById } from '@/hooks/queries/product';
import { Heading2, Heading3 } from '@/components/Content';
import { useInput } from '@/hooks';
import { kallInstance } from '@/data/axios.data';
import { basicInfoEditStyle, detailImagesEditStyle, imageEditStyle } from './style';

export function ProductEdit() {
  const [ files, setFiles, ] = useState([]);

  const params = useParams();
  const productData = useProductsById(Number(params.id));

  const imageRef = useRef<HTMLInputElement>();
  const fileRef = useRef<HTMLInputElement>();
  const filesRef = useRef<HTMLInputElement>();

  const nameRef = useRef<HTMLInputElement>();
  const tagRef = useRef<HTMLInputElement>();
  const infoRef = useRef<HTMLInputElement>();
  const amountRef = useRef<HTMLInputElement>();
  const priceRef = useRef<HTMLInputElement>();

  const image = useInput(imageRef, 'image');

  const name = useInput(nameRef, 'name');
  const tag = useInput(tagRef, 'tag');
  const info = useInput(infoRef, 'info');
  const amount = useInput(amountRef, 'amount');
  const price = useInput(priceRef, 'price');

  useEffect(() => {
    if ('id' in productData) {
      name.setValue(productData.name);
      tag.setValue(productData.tag.join(','));
      info.setValue(productData.info);
      amount.setValue(productData.amount.toString());
      price.setValue(productData.price.toString());
      image.setValue(productData.image);
    }
  }, [ productData, ]);

  // ==================== 대표 이미지 변경 ====================
  const onChangeFile = useCallback(() => {
    const file = fileRef.current.files[0];

    const formData = new FormData();

    formData.append('file', file);

    // TODO: 여기에 요청 들어감

    image.setValue(file.name);
  }, [ fileRef, ]);

  // ==================== 상세 이미지 추가 ====================
  const onChangeFiles = useCallback(() => {
    const fileList = filesRef.current.files;
    const newFiles = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      if (file.type.startsWith('image/')) {
        newFiles.push({ id: i + 1, file, });
      }
    }

    setFiles((prev) => [ ...prev, ...newFiles, ]);
  }, [ filesRef, ]);

  // ==================== 상세 이미지 업로드 ====================
  const onClickFiles = useCallback(() => {
    const formData = new FormData();

    files.forEach((item) => {
      formData.append('file', item.file);
    });

    // TODO: 이 부분은 쿼리로 변경해야함
    kallInstance.post(
      '/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }, [ files, ]);

  // ==================== 상세 이미지 목록에서 제거 ====================
  const onClickDeleteFileItem = useCallback((id: number) => {
    setFiles((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <>
      <AppLayout title={`${productData?.name} - 상품 수정`}>
        <AdminLayout pageId='admin-product-edit-page'>
          <Heading2>{productData?.name} 상품 정보</Heading2>

          <Heading3>이미지 수정</Heading3>
          <div className='image-edit' css={imageEditStyle}>
            <img src={image.data.value} alt={productData?.name} />
            <div>
              <input type='file' hidden ref={fileRef} onChange={onChangeFile} />
              <input type='text' ref={imageRef} {...image.data} />
              <button type='button' onClick={() => fileRef.current.click()}>이미지 변경</button>
            </div>
          </div>

          <Heading3>기본정보 수정</Heading3>
          <div className='basic-info-edit' css={basicInfoEditStyle}>
            <label htmlFor='name'>
              <span>상품 이름</span>
              <input type='text' ref={nameRef} {...name.data} />
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
            <button>기본 정보 변경</button>
          </div>

          <Heading3>상세 설명 이미지 변경</Heading3>
          <div className='detail-images-edit' css={detailImagesEditStyle}>
            <input
              type='file'
              multiple
              hidden
              accept='image/*'
              ref={filesRef}
              onChange={onChangeFiles}
            />
            <button type='button' onClick={() => filesRef.current.click()}>이미지 선택</button>
            <div className='file-list'>
              {files.map((item) => (
                <div key={item.id}>
                  <span>{item.file.name}</span>
                  <span onClick={() => onClickDeleteFileItem(item.id)}>
                    <FaTimes />
                  </span>
                </div>
              ))}
            </div>
            <button type='button' onClick={onClickFiles}>이미지 변경</button>
          </div>
        </AdminLayout>
      </AppLayout>
    </>
  );
}
