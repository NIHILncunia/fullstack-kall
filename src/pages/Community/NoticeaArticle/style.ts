import tw, { css } from 'twin.macro';

export const noticeArticlePageStyle = css`
  ${tw` p-[50px] text-[1.2rem] text-black-base `}
`;

export const goToBackStyle = css`
  ${tw` text-left mb-[20px] `}

  & > a,
  & > button {
    ${tw` inline-block w-[200px] p-[10px] border border-solid border-black-200 bg-black-50 text-center `}
    ${tw` hover:border-point-h-base hover:text-white hover:bg-point-h-base `}
  }

  & > button {
    ${tw` ml-[20px] `}
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
