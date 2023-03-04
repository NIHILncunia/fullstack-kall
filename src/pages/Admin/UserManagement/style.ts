import tw, { css } from 'twin.macro';

export const userItemStyle = css`
  ${tw` flex flex-col gap-[2px] my-[30px] `}

  & > div.list-header {
    ${tw` flex items-center gap-[2px] border border-solid border-point-h-base bg-point-h-base `}

    & > p {
      ${tw` font-[900] `}
      ${tw` flex items-center justify-center p-[10px] `}
      ${tw` nth-1:shrink-0 nth-1:w-[70px] `}
      ${tw` nth-2:shrink-0 nth-2:w-[150px] `}
      ${tw` nth-3:flex-[1] `}
      ${tw` nth-4:shrink-0 nth-4:w-[300px] `}
    }
  }
`;
