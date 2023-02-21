import tw, { css } from 'twin.macro';

export const ProductItemPageStyle = css`
  ${tw` py-[50px] text-black-base `}
`;

export const detailTopStyle = css`
  ${tw` flex flex-row gap-[40px] mb-[50px] items-start `}
`;

export const topImageStyle = css`
  ${tw` w-[560px] leading-[560px] text-[2rem] border-[1px] border-solid border-black-base mb-[10px] text-center `}

  & > img {
    ${tw` w-full h-[560px] block `}
  }
`;

export const topInfoStyle = css`
  ${tw` text-[1.2rem] flex-[1] `}

  & > div.tags {
    ${tw` flex flex-row gap-[10px] mb-[20px] `}

    & > a {
      ${tw` bg-point-pink border border-solid border-point-pink p-[5px_10px] select-none cursor-pointer `}
      ${tw` hover:border-solid hover:border-pink-200 hover:border-[1px] `}
    }
  }

  & > div.name {
    ${tw` flex flex-row mb-[20px] items-start `}

    & > h2 {
      ${tw` flex-[1] text-[2rem] text-justify `}
    }

    & > div {
      ${tw` flex gap-[5px] `}

      & > button {
        ${tw` p-[10px] text-black-200 rounded-[50%] border-[2px] border-solid border-black-200 text-[1.5rem] `}
      }
    }
  }

  & > div.rate {
    ${tw` pb-[10px] border-b-[1px] border-solid border-b-black-base mb-[20px] text-[2rem] text-left `}
  }

  & > div.prices {
    ${tw` mb-[30px] `}

    & > p.item-price {
      ${tw` mb-[10px] text-[2rem] font-[700] `}
    }

    & > p.delivery-price {
      & > strong {
        ${tw` text-[700] `}
      }
    }
  }

  & > div.info-bottom {
    ${tw` flex gap-[20px] `}

    & > button {
      ${tw` flex-[1] bg-point-base text-black-base p-[20px_10px] `}
      ${tw` hover:text-white hover:bg-point-h-base `}
    }
  }
`;
