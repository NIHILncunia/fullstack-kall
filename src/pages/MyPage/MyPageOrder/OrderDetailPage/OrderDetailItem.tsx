import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import { useCookies } from 'react-cookie';
import tw from 'twin.macro';
import { useNavigate } from 'react-router';
import { IOrderDetail } from '@/types/tables.types';
import { useProductById } from '@/hooks/trueQuery/product';
import { getItemString } from '@/utils';
import { ItemRate } from '@/components/Content';
import { useCategoryById } from '@/hooks/trueQuery/category';
import { refundInputStyle } from './style';

interface IOrderDetailItemProps {
  item: IOrderDetail;
}

export function OrderDetailItem({ item, }: IOrderDetailItemProps) {
  const [ isRefund, setIsRefund, ] = useState(false);
  const [ label, setLabel, ] = useState('반품 요청');

  const [ title, setTitle, ] = useState('');
  const [ content, setContent, ] = useState('');
  const [ files, setFiles, ] = useState([]);
  const [ inputError, setInputError, ] = useState(false);

  const navi = useNavigate();

  const fileRef = useRef<HTMLInputElement>();
  const fileInputRef = useRef<HTMLInputElement>();

  const [ { id: userId, }, setCookie, ] = useCookies([ 'id', 'odId', 'pId', ]);
  const product = useProductById(Number(item.product_id));
  const sheet = useCategoryById(item.option_sheet).categoryName;
  const shape = useCategoryById(item.option_shape).categoryName;
  const cream = useCategoryById(item.option_cream).categoryName;
  const size = useCategoryById(item.option_size).categoryName;

  console.log(item);

  const selection = {
    sheet,
    shape,
    cream,
    size,
  };

  const { itemString, itemTotalPrice, } = getItemString(selection, product, item);

  useEffect(() => {
    if (!title || !content) {
      setInputError(true);
    } else {
      setInputError(false);
    }
  }, [ title, content, ]);

  const onChangeTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    []
  );

  const onChangeContent = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(event.target.value);
    },
    []
  );

  const onChangeFiles = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      const filesArray = Array.from(fileList);

      setFiles(filesArray);
      fileInputRef.current.value = filesArray.map((file) => file.name).join(', ');
    },
    []
  );

  const onClickRefund = useCallback((id: number) => {
    if (!isRefund) {
      setIsRefund((prev) => !prev);
      setLabel('반품 요청 완료');
    } else {
      if (inputError) {
        return;
      }

      setIsRefund((prev) => !prev);

      const formData = new FormData();

      const refundData = {
        order_dnb: id,
        user_id: userId,
        title,
        content,
      };

      formData.append(
        'refundData',
        new Blob(
          [ JSON.stringify(refundData), ],
          { type: 'application/json', }
        )
      );

      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          formData.append('files', files[i]);
        }
      }

      // 반품 요청을 하면 refund 테이블에 레코드가 추가되고 주문 상품에서는 스테이터스를 변경
      console.log(`[POST /refunds]`, {
        files,
        refundData,
      });

      setLabel('반품 요청');
    }
  }, [ isRefund, title, content, files, ]);

  const onClickCreateReview = useCallback(() => {
    setCookie('odId', item.id, { path: '/', });
    setCookie('pId', product.id, { path: '/', });
    navi('/mypage/review/create');
  }, [ item, product, ]);

  return (
    <>
      <div className='detail-item'>
        <img src={product.image} alt={product.name} />
        <div>
          <p>{itemString}</p>
          <p>{itemTotalPrice}원</p>
          <p>{item.status}</p>
          <ItemRate rate={product.star} styles={tw`justify-start`} />
          <div>
            {item.status === '배송완료' && (
              <button onClick={onClickCreateReview} css={tw`mr-[20px]`}>리뷰 작성</button>
            )}
            <button onClick={(event) => {
              event.preventDefault();

              onClickRefund(item.id);
            }}
            >{label}
            </button>
          </div>
        </div>
      </div>
      {isRefund && (
        <form className='refund-input' css={refundInputStyle}>
          <label htmlFor='title'>
            <span>제목</span>
            <input type='text' id='title' required value={title} onChange={onChangeTitle} />
          </label>
          <label htmlFor='content'>
            <span>내용</span>
            <textarea id='content' required value={content} onChange={onChangeContent} />
          </label>
          <input
            type='file'
            hidden
            ref={fileRef}
            multiple
            accept='image/*'
            onChange={onChangeFiles}
          />
          <div>
            <input type='text' ref={fileInputRef} readOnly />
            <button type='button' onClick={() => fileRef.current.click()}>이미지 선택</button>
          </div>
          {inputError && (<p css={tw`text-red-500 font-[900] mt-[5px] text-right`}>제목과 내용을 입력해주세요.</p>)}
        </form>
      )}
    </>
  );
}
