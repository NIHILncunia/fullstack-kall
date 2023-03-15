import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import { useNavigate, useParams } from 'react-router';
import tw from 'twin.macro';
import { useCookies } from 'react-cookie';
import { useQueryClient } from 'react-query';
import { Heading2 } from '@/components/Content';
import { AppLayout } from '@/layouts';
import { useInput } from '@/hooks';
import { useReviewById, useUpdateReview } from '@/hooks/trueQuery/review';
import { buttonStyle, reviewUpdateFormStyle } from './style';
import { IReview } from '@/types/tables.types';

export function ReviewEditForm() {
  const [ text, setText, ] = useState('');
  const { id, } = useParams();
  const [ { role, }, ] = useCookies([ 'role', ]);
  const review = useReviewById(Number(id));

  const updateReview = useUpdateReview(review.reviewId);
  const qc = useQueryClient();

  const titleRef = useRef<HTMLInputElement>();
  const rateRef = useRef<HTMLInputElement>();

  const title = useInput(titleRef, 'title');
  const rate = useInput(rateRef, 'rate');

  const navi = useNavigate();

  const onChangeText = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }, []);

  useEffect(() => {
    if ('reviewId' in review) {
      title.setValue(review.title);
      setText(review.content);
      rate.setValue(review.star?.toString());
    }
  }, [ review, ]);

  const onClickEdit = useCallback(() => {
    const updateData: IReview = {
      reviewId: review.reviewId,
      title: title.data.value,
      content: text,
      star: parseFloat(rate.data.value),
    };

    if (role === 'admin') {
      updateReview.mutate({ data: updateData, role, }, {
        onSuccess: () => {
          qc.refetchQueries([ 'getReviews', ]);
        },
      });
      console.log(`[PUT /admin/reviews/${id}]`, updateData);
    } else {
      updateReview.mutate({ data: updateData, }, {
        onSuccess: () => {
          qc.refetchQueries([ 'getReviews', ]);
        },
      });
      console.log(`[PUT /reviews/${id}]`, updateData);
    }
    navi(role ? `/admin/review/${id}` : `/mypage/review/${id}`);
  }, [ id, title, text, rate, role, ]);

  return (
    <>
      <AppLayout title='리뷰 수정'>
        <div id='review-update-page' css={tw`py-[50px] text-[1.2rem] text-black-base`}>
          <Heading2>리뷰 수정</Heading2>
          <div css={reviewUpdateFormStyle}>
            <label htmlFor='title'>
              <span>제목</span>
              <input type='text' ref={titleRef} {...title.data} />
            </label>
            <label htmlFor='content'>
              <span>내용</span>
              <textarea value={text} id='content' onChange={onChangeText} />
            </label>
            <label htmlFor='rate'>
              <span>평점</span>
              <input type='text' ref={rateRef} {...rate.data} />
            </label>
          </div>
          <div css={buttonStyle}>
            <button onClick={onClickEdit}>수정 완료</button>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
