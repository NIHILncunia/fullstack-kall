import tw, { css } from 'twin.macro';

export const orderDetailListStyle = css`
  ${tw` border border-solid border-black-200 bg-black-50 p-[10px] flex items-stretch gap-[20px] `}

  & > img {
    ${tw` block w-[150px] h-[150px] bg-black-base shrink-0 `}
  }

  & > div {
    ${tw` flex flex-col gap-[2px] w-full `}

    & > div {
      ${tw` nth-2:( flex-[1] shrink-0 ) `}
    }
  }
`;
