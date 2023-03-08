import tw, { css } from 'twin.macro';

export const noticeButtonStyle = css`
  ${tw` flex items-center gap-[20px] justify-end mb-[30px] `}

  & > button {
    ${tw` bg-point-base shrink-0 w-[200px] p-[10px] `}
    ${tw` hover:( text-white bg-point-h-base ) `}
  }
`;

export const listStyle = css`
  ${tw` flex flex-col gap-[2px] `}
`;

export const listHeaderStyle = css`
  ${tw` flex items-center gap-[2px] `}

  & > div {
    ${tw` p-[10px] border shrink-0 border-point-h-base bg-point-h-base font-[900] flex items-center justify-center `}
    ${tw` nth-1:( w-[70px] ) `}
    ${tw` nth-2:( flex-[1] ) `}
    ${tw` nth-3:( w-[150px] ) `}
    ${tw` nth-4:( w-[250px] ) `}
  }
`;
