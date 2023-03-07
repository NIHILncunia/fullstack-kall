import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import { useNavigate, useParams } from 'react-router';
import tw from 'twin.macro';
import { useCookies } from 'react-cookie';
import { Heading2 } from '@/components/Content';
import { AppLayout } from '@/layouts';
import { useInput } from '@/hooks';
import { useReviewById } from '@/hooks/trueQuery/review';
import { buttonStyle, reviewUpdateFormStyle } from './style';

export function ReviewEditForm() {
  const [ text, setText, ] = useState('');
  const { id, } = useParams();
  const [ { role, }, ] = useCookies([ 'role', ]);
  const review = useReviewById(Number(id));

  const titleRef = useRef<HTMLInputElement>();
  const rateRef = useRef<HTMLInputElement>();

  const title = useInput(titleRef, 'title');
  const rate = useInput(rateRef, 'rate');

  const navi = useNavigate();

  const onChangeText = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }, []);

  useEffect(() => {
    if ('id' in review) {
      title.setValue(review.title);
      setText(review.content);
      rate.setValue(review.star?.toString());
    }
  }, [ review, ]);

  const onClickEdit = useCallback(() => {
    const updateData = {
      title: title.data.value,
      content: text,
      rate: parseFloat(rate.data.value),
    };

    console.log(`[PUT /reviews/${id}]`, updateData);
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
