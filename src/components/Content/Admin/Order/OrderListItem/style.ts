import tw, { css } from 'twin.macro';

export const orderListItemStyle = css`
  ${tw` flex items-center gap-[2px] `}

  & > p {
    ${tw` border border-solid border-black-200 bg-black-50 p-[10px] flex-[1] flex items-center justify-center `}
    ${tw` nth-1:( flex-none w-[60px] ) `}
    ${tw` nth-2:( justify-start cursor-pointer ) nth-2:hover:( border-point-h-base bg-point-base/40 text-point-link font-[900] ) `}

    &:nth-of-type(1) > input {
      ${tw` w-[30px] h-[30px] `}
    }
  }
`;
