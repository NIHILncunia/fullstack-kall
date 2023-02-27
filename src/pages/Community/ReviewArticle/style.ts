import tw, { css } from 'twin.macro';

export const reviewArticlePageStyle = css`
  ${tw` p-[50px] text-[1.2rem] text-black-base `}
`;

export const goToBackStyle = css`
  ${tw` text-left mb-[20px] `}

  & > a {
    ${tw` inline-block w-[200px] p-[10px] border border-solid border-black-200 bg-black-50 text-center `}
    ${tw` hover:border-point-h-base hover:text-white hover:bg-point-h-base `}
  }
`;

export const articleTopStyle = css`
  & > h3 {
    ${tw` text-[2rem] font-[900] mb-[10px] p-[20px] pb-0 `}
  }

  & > div {
    ${tw` p-[20px] `}

    & > p {
      ${tw` flex items-center mb-[5px] nth-last-1:mb-0 `}

      & > span {
        ${tw` nth-1:shrink-0 nth-1:w-[100px] nth-1:font-[900] `}
      }
    }
  }
`;

export const articleContentStyle = css`
  ${tw` py-[50px] px-[20px] `}
`;

export const articleRateStyle = css`
  ${tw` flex items-center gap-[10px] p-[20px] justify-center text-[2rem] border border-solid border-black-200 `}

  & > h4 {
    ${tw` font-[900] `}
  }
`;

export const articleBottomStyle = css`
  ${tw` flex gap-[10px] p-[10px] border border-solid border-black-200 `}

  & > div {
    ${tw` flex-[1] flex items-center justify-center `}

    & > a {
      ${tw` flex-[1] border border-solid border-black-200 text-black-base bg-black-50 p-[10px] flex items-center gap-[5px] justify-center `}
      ${tw` hover:bg-point-link hover:text-white hover:border-point-link `}
    }
  }
`;

export const articleTargetItemStyle = css`
  ${tw` flex flex-col p-[10px] border border-solid border-black-200 border-t-0 mb-[30px] `}

  & > p {
    ${tw` border-b border-solid border-b-black-200 pb-[10px] mb-[10px] text-center font-[900] `}
  }

  & > div {
    ${tw` flex gap-[20px] `}

    & > img {
      ${tw` w-[200px] h-[200px] bg-black-base `}
    }

    & > div {
      ${tw` flex flex-col flex-[1] shrink-0 `}

      & > h4 {
        ${tw` mb-[10px] `}

        & > a {
          ${tw` font-[900] text-[1.5rem] text-point-link `}
          ${tw` hover:underline hover:text-point-h-link `}
        }
      }

      & > p {
        ${tw` nth-1:flex-[1] `}
        ${tw` nth-2:text-[2rem] nth-2:justify-end `}
      }
    }
  }
`;

export const articleOrderListStyle = css`
  ${tw` p-[10px] border border-solid border-black-200 mb-[30px] `}

  & > p:nth-of-type(1) {
    ${tw` border-b border-solid border-b-black-200 pb-[10px] mb-[10px] text-center font-[900] `}
  }
`;
