import { SerializedStyles } from '@emotion/react';
import React from 'react';
import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';
import tw, { css, TwStyle } from 'twin.macro';

interface IItemRateProps {
  rate: number;
  styles?: SerializedStyles | TwStyle;
}

export function ItemRate({ rate, styles, }: IItemRateProps) {
  const fullStarCount = Math.floor(rate); // 별점의 정수 부분
  const halfStar = rate - fullStarCount >= 0.5; // 반 별점인지 여부

  const stars = []; // 별점을 담을 배열
  for (let i = 0; i < 5; i++) {
    if (i < fullStarCount) {
      stars.push(<FaStar key={i} />);
    } else if (i === fullStarCount && halfStar) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }

  const starRateStyle = css`
    ${tw` text-point-h-base inline-flex flex-row items-center justify-center `}
    ${styles}

    & svg {
      ${tw` mb-[2px] `}
    }

    & span {
      ${tw` text-black-base ml-[5px] `}
    }
  `;

  return (
    <>
      <p css={starRateStyle}>
        {stars}
        <span>({rate})</span>
      </p>
    </>
  );
}
