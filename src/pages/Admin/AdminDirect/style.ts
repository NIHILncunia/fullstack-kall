import tw, { css } from 'twin.macro';

export const buttonStyle = css`
  ${tw` mb-[30px] flex gap-[20px] justify-end `}

  & > button {
    ${tw` bg-point-base w-[200px] shrink-0 p-[10px] `}
    ${tw` hover:( bg-point-h-base text-white ) `}
  }
`;

export const directListStyle = css`
  ${tw` flex flex-col gap-[2px] `}
`;

export const directListHeaderStyle = css`
  ${tw` flex items-center gap-[2px] `}

  & > div {
    ${tw` p-[10px] border border-point-h-base bg-point-h-base shrink-0 flex items-center justify-center font-[900] `}
    ${tw` nth-1:( w-[70px]  ) `}
    ${tw` nth-2:( w-[150px] ) `}
    ${tw` nth-3:( flex-[1] ) `}
    ${tw` nth-4:( w-[150px] ) `}
  }
`;
