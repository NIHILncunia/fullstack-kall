import tw, { css } from 'twin.macro';

export const listHeaderStyle = css`
  ${tw` flex items-center gap-[2px] `}

  & > p {
    ${tw` border border-solid border-point-h-base bg-point-h-base font-[900] flex items-center justify-center p-[10px] flex-[1] `}
    ${tw` nth-1:( flex-none w-[60px] ) `}
  }
`;
