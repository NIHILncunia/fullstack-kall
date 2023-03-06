import tw, { css } from 'twin.macro';

export const refundListStyle = css`
  ${tw` flex flex-col gap-[2px] `}

  & > div {
    ${tw` flex items-center gap-[2px] `}

    & > div {
      ${tw` border border-solid p-[10px] `}
      ${tw` nth-1:( shrink-0 w-[100px] flex items-center justify-center ) `}
      ${tw` nth-2:( flex-[1] ) `}
      ${tw` nth-3:( shrink-0 w-[150px] flex items-center justify-center ) `}
      ${tw` nth-4:( shrink-0 w-[150px] flex items-center justify-center ) `}
    }

    &.list-header {
      & > div {
        ${tw` border-point-h-base bg-point-h-base font-[900] `}
      }
    }

    &.list-content {
      & > div {
        ${tw` border-black-200 bg-black-50 `}
        ${tw` nth-2:( flex items-center p-0  ) `}
        ${tw` hover:( border-point-h-base bg-point-base/40 ) `}

        & > a {
          ${tw` block p-[10px] flex-1 `}
        }
      }
    }
  }
`;
