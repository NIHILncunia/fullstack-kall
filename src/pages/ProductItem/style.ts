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

        &.wishlist {
          ${tw` text-red-500 border-red-500 `}
        }
      }
    }
  }

  & > div.rate {
    ${tw` pb-[10px] border-b-[1px] border-solid border-b-black-base mb-[20px] text-[2rem] text-left `}
  }

  & > div.prices {
    ${tw` mb-[30px] `}

    & > p.item-price {
      ${tw` mb-[10px] text-[2rem] font-[900] `}
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

export const sectionStyle = css`
  ${tw` mb-[30px] nth-last-1:mb-0 text-[1.2rem] text-black-base `}

  & > ul {
    ${tw` flex `}

    & > li {
      ${tw` flex-[1] h-[50px] `}

      & > a {
        ${tw` block text-center leading-[50px] bg-point-base text-black-base/50 `}
      }

      &.select > a {
        ${tw` bg-point-h-base text-black-base `}
      }
    }
  }

  & > div.content {
    ${tw` border-2 border-solid border-point-h-base p-[20px] `}

    & > p.info-message {
      ${tw` mb-[30px] nth-last-1:mb-0 `}
    }
  }
`;

export const reviewList = css`
  ${tw` flex items-center gap-[5px] `}

  & > div {
    ${tw` p-[10px] border border-black-200 bg-black-50 `}
    
    &.link {
      ${tw` nth-1:( p-0 shrink-0 flex-[1] ) `}
      ${tw` nth-1:hover:( border-point-h-base bg-point-base/40 ) `}

      &:nth-of-type(1) > a {
        ${tw` p-[10px] block `}
      }
    }

    &:not(div.link) {
      ${tw` nth-1:( shrink-0 flex-[1] flex items-center gap-[20px] ) `}

      & > span {
        ${tw` flex-[1] shrink-0 `}
      }
    }

    ${tw` nth-2:( shrink-0 w-[150px] flex items-center justify-center ) `}
    ${tw` nth-3:( shrink-0 w-[250px] flex items-center justify-center ) `}
  }
`;
