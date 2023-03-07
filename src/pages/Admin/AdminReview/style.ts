import tw, { css } from 'twin.macro';

export const reviewListStyle = css`
  ${tw` flex flex-col gap-[2px] `}
`;

export const listHeaderStyle = css`
  ${tw` flex items-center gap-[2px] `}

  & > div {
    ${tw` p-[10px] border border-solid border-point-h-base flex items-center justify-center font-[900] bg-point-h-base `}
    ${tw` nth-1:( shrink-0 w-[60px] ) `}
    ${tw` nth-2:( shrink-0 flex-[1] ) `}
    ${tw` nth-3:( shrink-0 w-[150px] ) `}
    ${tw` nth-4:( shrink-0 w-[150px] ) `}
  }
`;
