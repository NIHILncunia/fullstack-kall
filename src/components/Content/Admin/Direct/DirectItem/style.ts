import tw, { css } from 'twin.macro';

export const directListContentStyle = css`
  ${tw` flex items-stretch gap-[2px] `}

  & > div {
    ${tw` p-[10px] border border-black-200 bg-black-50 shrink-0 `}
    ${tw` nth-1:( w-[70px] flex items-center justify-center ) `}
    ${tw` nth-2:( w-[150px] flex items-center justify-center ) `}
    ${tw` nth-3:( flex-[1] p-0 ) `}
    ${tw` nth-3:hover:( border-point-h-base bg-point-base/40 ) `}
    ${tw` nth-4:( w-[150px] flex items-center justify-center ) `}

    & > a {
      ${tw` block p-[10px] `}
    }

    & > input {
      ${tw` w-[30px] h-[30px] `}
    }
  }
`;
