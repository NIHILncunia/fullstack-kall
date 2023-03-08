import tw, { css } from 'twin.macro';

export const listContentStyle = css`
  ${tw` flex items-stretch gap-[2px] `}

  & > div {
    ${tw` p-[10px] border shrink-0 border-black-200 bg-black-50 `}
    ${tw` nth-1:( w-[70px] flex items-center justify-center ) `}
    ${tw` nth-2:( flex-[1] !p-0 hover:( border-point-h-base bg-point-base/40 ) ) `}
    ${tw` nth-3:( w-[150px] flex items-center justify-center ) `}
    ${tw` nth-4:( w-[250px] flex items-center justify-center ) `}

    & > input {
      ${tw` w-[30px] h-[30px] `}
    }

    & > a {
      ${tw` p-[10px] block `}
    }
  }
`;
