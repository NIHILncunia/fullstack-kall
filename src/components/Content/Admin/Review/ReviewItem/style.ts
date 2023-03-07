import tw, { css } from 'twin.macro';

export const reviewItemStyle = css`
  ${tw` flex gap-[2px] `}

  & > div {
    ${tw` p-[10px] border border-solid border-black-200 bg-black-50 `}
    ${tw` nth-1:( shrink-0 w-[60px] flex items-center justify-center ) `}
    ${tw` nth-2:( shrink-0 flex-[1] p-0 ) `}
    ${tw` nth-2:hover:( border-point-h-base bg-point-base/40 ) `}
    ${tw` nth-3:( shrink-0 w-[150px] flex items-center justify-center ) `}

    & > a {
      ${tw` block p-[10px] `}
    }

    & > input {
      ${tw` w-[30px] h-[30px] `}
    }
  }

  & > p {
    ${tw` border p-[10px] border-solid border-black-200 bg-black-50 shrink-0 w-[150px] `}
  }
`;
