import tw, { css } from 'twin.macro';

export const orderListStyle = css`
  ${tw` flex flex-col gap-[2px] `}

  & > div.list-header,
  & > div.list-content {
    ${tw` flex items-stretch gap-[2px] `}

    & > p {
      ${tw` border shrink-0 flex-[1] border-solid `}
      ${tw` nth-1:( flex-[3] ) `}
    }
  }

  & > div.list-header {
    & > p {
      ${tw` p-[10px] bg-point-h-base border-point-h-base font-[900] flex items-center justify-center `}
    }
  }

  & > div.list-content {
    & > p {
      ${tw` p-[10px] border-black-200 bg-black-50 `}
      ${tw` nth-1:hover:( border-point-h-base bg-point-base/40 ) nth-1:cursor-pointer `}
      ${tw` nth-2:( flex items-center justify-center ) `}
      ${tw` nth-3:( flex items-center justify-end ) `}
      ${tw` nth-4:( flex items-center justify-center ) `}
    }
  }
`;
