import React, {
  useCallback, useRef, useState
} from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import { useQueryClient } from 'react-query';
import { Heading2 } from '@/components/Content';
import { AppLayout } from '@/layouts';
import { useInput } from '@/hooks';
import { createReviewButtonBack, createReviewForm } from './style';
import { IReview } from '@/types/tables.types';
import { useUserById } from '@/hooks/trueQuery/users';
import { useProductById } from '@/hooks/trueQuery/product';
import { useOrderDetailById } from '@/hooks/trueQuery/orderDetail';
import { useCreateReview } from '@/hooks/trueQuery/review';

export function CreateReview() {
  const [ content, setContent, ] = useState('');
  const [ files, setFiles, ] = useState([]);

  const qc = useQueryClient();
  // eslint-disable-next-line no-unused-vars
  const [ { id, pId, odId, }, _, removeCookie, ] = useCookies([ 'id', 'pId', 'odId', ]);
  const navi = useNavigate();
  const createReview = useCreateReview();

  const user = useUserById(id);
  const product = useProductById(pId);
  const orderDetail = useOrderDetailById(odId);

  const titleRef = useRef<HTMLInputElement>();
  const contentRef = useRef<HTMLTextAreaElement>();
  const rateRef = useRef<HTMLInputElement>();

  const fileRef = useRef<HTMLInputElement>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const title = useInput(titleRef, 'title');
  const rate = useInput(rateRef, 'rate');

  const onChangeContent = useCallback(() => {
    setContent(contentRef.current.value);
  }, [ contentRef, ]);

  const onChangeFiles = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { files: formFiles, } = event.target;
    const fileList = Array.from(formFiles);

    setFiles(fileList.slice(0, 2));
    event.target.value = null; // 파일 선택 초기화

    // 선택한 파일들의 이름을 fileInputRef에 표시
    const fileNames = fileList
      .map((file) => file.name)
      .slice(0, 2)
      .join(', ');

    fileInputRef.current.value = fileNames;
  }, []);

  const onClickCreate = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    const reviewData: IReview = {
      userDTO: user,
      productDTO: product,
      orderDetailDTO: orderDetail,
      title: title.data.value,
      content,
      star: parseFloat(rate.data.value),
    };

    if (files.length > 0) {
      formData.append('files', files[0]);
      if (files.length > 1) {
        formData.append('files', files[1]);
      }
    }

    formData.append(
      'reviewData',
      new Blob(
        [ JSON.stringify(reviewData), ],
        { type: 'application/json', }
      )
    );

    console.log('[POST /reviews]', {
      files,
      reviewData,
    });

    createReview.mutate(formData, {
      onSuccess: () => {
        qc.refetchQueries([ 'getReviews', ]);
      },
    });
    removeCookie('pId', { path: '/', });
    removeCookie('odId', { path: '/', });
    navi('/mypage/review');
  }, [ id, pId, title, content, rate, files, ]);

  return (
    <>
      <AppLayout title='리뷰 작성'>
        <div id='review-create-page' css={tw`text-[1.2rem] text-black-base py-[50px]`}>
          <Heading2>리뷰 작성</Heading2>

          <div css={createReviewButtonBack}>
            <Link to='/mypage/review'>리뷰 내역으로</Link>
          </div>

          <form onSubmit={onClickCreate} css={createReviewForm}>
            <label htmlFor='title'>
              <span>제목</span>
              <input type='text' ref={titleRef} {...title.data} required />
            </label>
            <label htmlFor='content'>
              <span>내용</span>
              <textarea id='content' ref={contentRef} value={content} onChange={onChangeContent} required />
            </label>
            <input
              type='file'
              hidden
              multiple
              accept='image/*'
              ref={fileRef}
              onChange={onChangeFiles}
            />
            <div className='files'>
              <input type='text' readOnly ref={fileInputRef} />
              <button type='button' onClick={() => fileRef.current.click()}>이미지 선택</button>
            </div>
            <label htmlFor='rate'>
              <span>평점</span>
              <input type='text' ref={rateRef} {...rate.data} required />
            </label>

            <div className='button'>
              <button>리뷰 작성</button>
            </div>
          </form>
        </div>
      </AppLayout>
    </>
  );
}
