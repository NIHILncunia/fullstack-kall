import tw, { css } from 'twin.macro';

export const defaultInfoStyle = css`
  ${tw` mb-[50px] flex flex-col gap-[2px] `}

  & > p {
    ${tw` flex gap-[2px] items-center `}

    & > span {
      ${tw` p-[10px] border border-solid bg-black-50 border-black-200 `}
      ${tw` nth-1:shrink-0 nth-1:w-[150px] nth-1:bg-point-h-base nth-1:border-point-h-base nth-1:font-[900] `}
      ${tw` nth-2:flex-[1] `}
    }
  }
`;

export const orderStatStyle = css`
  ${tw` mb-[50px] flex items-center gap-[5px] `}

  & > div {
    ${tw` flex-[1] `}

    & > a {
      ${tw` border border-solid border-black-200 bg-black-50 p-[10px] flex flex-col gap-[5px] items-center justify-center `}
      ${tw` hover:bg-point-base/40 hover:border-point-h-base hover:text-blue-500 `}

      & > span {
        ${tw` font-[900] `}
      }
    }
  }
`;

export const mypageIconLinkStyle = css`
  ${tw` flex flex-col gap-[5px] `}

  & > div {
    ${tw` flex gap-[5px] items-center `}

    & > div {
      ${tw` flex-[1] `}

      & > a {
        ${tw` border border-solid border-black-200 bg-black-50 p-[10px] flex flex-col gap-[5px] items-center justify-center `}
        ${tw` hover:bg-point-base/40 hover:border-point-h-base hover:text-blue-500 `}

        & > span {
          ${tw` font-[900] `}
        }
      }
    }
  }
`;
