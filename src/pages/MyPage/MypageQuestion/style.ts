import tw, { css } from 'twin.macro';

export const questionDirectbutton = css`
  ${tw` flex items-center gap-[20px] mb-[30px] `}

  & > button {
    ${tw` p-[10px] border border-black-200 bg-black-50 flex-[1] shrink-0 block `}
    ${tw` hover:( border-point-h-base bg-point-base/40 ) `}

    &.selected {
      ${tw` bg-point-h-base border-point-h-base font-[900] text-white `}
    }
  }
`;

export const questionList = css`
  ${tw` flex flex-col gap-[2px] `}
`;

export const listHeader = css`
  ${tw` flex items-center gap-[2px] `}

  & > div {
    ${tw` p-[10px] border border-point-h-base bg-point-h-base font-[900] flex items-center justify-center shrink-0 w-[150px] `}
    ${tw` nth-1:( flex-[1] shrink-0 ) `}
    ${tw` nth-last-1:( shrink-0 w-[100px] ) `}
    ${tw` nth-last-2:( shrink-0 w-[250px] ) `}
  }
`;

export const questionListContent = css`
  ${tw` flex items-stretch gap-[2px] `}

  & > div {
    ${tw` p-[10px] border border-black-200 bg-black-50 `}
    ${tw` nth-1:( flex-[1] shrink-0 cursor-pointer ) `}
    ${tw` nth-1:hover:( border-point-h-base bg-point-base/40 ) `}
    ${tw` nth-last-1:( shrink-0 w-[100px] flex items-center justify-center ) `}
    ${tw` nth-last-2:( shrink-0 w-[250px] flex items-center justify-center ) `}
  }
`;

export const directListContent = css`
  ${tw` flex items-stretch gap-[2px] `}

  & > div {
    ${tw` p-[10px] border border-black-200 bg-black-50 `}
    ${tw` nth-1:( flex-[1] shrink-0 cursor-pointer ) `}
    ${tw` nth-1:hover:( border-point-h-base bg-point-base/40 ) `}
    ${tw` nth-2:( shrink-0 w-[150px] flex items-center justify-center ) `}
    ${tw` nth-last-1:( shrink-0 w-[100px] flex items-center justify-center ) `}
    ${tw` nth-last-2:( shrink-0 w-[250px] flex items-center justify-center ) `}
  }
`;
