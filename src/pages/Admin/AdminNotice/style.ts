import tw, { css } from 'twin.macro';

export const noticeButtonStyle = css`
  ${tw` flex items-center gap-[20px] justify-end `}

  & > button {
    ${tw` bg-point-base shrink-0 w-[200px] p-[10px] `}
    ${tw` hover:( text-white bg-point-h-base ) `}
  }
`;

export const noticeListStyle = css`
  ${tw` flex flex-col gap-[2px] mt-[30px] `}

  & > div.list-header {
    ${tw` flex gap-[2px] `}

    & > div {
      ${tw` p-[10px] border border-point-h-base bg-point-h-base font-[900] flex items-center justify-center shrink-0 `}
      ${tw` nth-1:( w-[60px] ) `}
      ${tw` nth-2:( w-[150px] ) `}
      ${tw` nth-3:( flex-[1] ) `}
      ${tw` nth-4:( w-[100px] ) `}
    }
  }
`;

export const categoryButtonStyle = css`
  ${tw` flex items-center gap-[20px] mb-[30px] `}

  & > button {
    ${tw` p-[20px_10px] flex-[1] shrink-0 bg-point-base `}
    ${tw` hover:( text-white bg-point-h-base ) `}
  }
`;
