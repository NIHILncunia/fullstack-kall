import tw, { css } from 'twin.macro';

export const listContentStyle = css`
  ${tw` flex items-stretch gap-[2px] `}

  & > div {
    ${tw` p-[10px] border border-black-200 bg-black-50 shrink-0 `}
    ${tw` nth-1:( w-[60px] flex items-center justify-center ) `}
    ${tw` nth-2:( w-[150px] flex items-center justify-center ) `}
    ${tw` nth-3:( flex-[1] p-0 ) `}
    ${tw` nth-3:hover:( border-point-h-base bg-point-base/40 ) `}
    ${tw` nth-4:( w-[100px] flex items-center justify-center ) `}

    &:nth-of-type(1) > input {
      ${tw` w-[30px] h-[30px] `}
    }

    &:nth-of-type(3) > a {
      ${tw` p-[10px] block `}
    }
  }
`;
