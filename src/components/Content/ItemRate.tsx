import { SerializedStyles } from '@emotion/react';
import React from 'react';
import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';
import tw, { css, TwStyle } from 'twin.macro';

interface IItemRateProps {
  rate: number;
  styles?: SerializedStyles | TwStyle;
}

export function ItemRate({ rate, styles, }: IItemRateProps) {
  let rateStar: React.ReactElement;

  if (rate >= 0.0 && rate < 0.5) {
    rateStar = (
      <>
        <FaRegStar />
        <FaRegStar />
        <FaRegStar />
        <FaRegStar />
        <FaRegStar />
      </>
    );
  } else if (rate >= 0.5 && rate < 1.0) {
    rateStar = (
      <>
        <FaStarHalfAlt />
        <FaRegStar />
        <FaRegStar />
        <FaRegStar />
        <FaRegStar />
      </>
    );
  } else if (rate >= 1.0 && rate < 1.5) {
    rateStar = (
      <>
        <FaStar />
        <FaRegStar />
        <FaRegStar />
        <FaRegStar />
        <FaRegStar />
      </>
    );
  } else if (rate >= 1.5 && rate < 2.0) {
    rateStar = (
      <>
        <FaStar />
        <FaStarHalfAlt />
        <FaRegStar />
        <FaRegStar />
        <FaRegStar />
      </>
    );
  } else if (rate >= 2.0 && rate < 2.5) {
    rateStar = (
      <>
        <FaStar />
        <FaStar />
        <FaRegStar />
        <FaRegStar />
        <FaRegStar />
      </>
    );
  } else if (rate >= 2.5 && rate < 3.0) {
    rateStar = (
      <>
        <FaStar />
        <FaStar />
        <FaStarHalfAlt />
        <FaRegStar />
        <FaRegStar />
      </>
    );
  } else if (rate >= 3.0 && rate < 3.5) {
    rateStar = (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaRegStar />
        <FaRegStar />
      </>
    );
  } else if (rate >= 3.5 && rate < 4.0) {
    rateStar = (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalfAlt />
        <FaRegStar />
      </>
    );
  } else if (rate >= 4.0 && rate < 4.5) {
    rateStar = (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaRegStar />
      </>
    );
  } else if (rate >= 4.5 && rate <= 5.0) {
    rateStar = (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalfAlt />
      </>
    );
  } else {
    rateStar = (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </>
    );
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
        {rateStar}
        <span>({rate})</span>
      </p>
    </>
  );
}
