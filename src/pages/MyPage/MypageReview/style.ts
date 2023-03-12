import tw, { css } from 'twin.macro';

export const reviewListHeader = css`
  ${tw` flex items-center gap-[2px] `}

  & > p {
    ${tw` p-[10px] border border-point-h-base bg-point-h-base font-[900] flex items-center justify-center shrink-0 `}
    ${tw` nth-1:( flex-[1] ) `}
    ${tw` nth-2:( w-[150px] ) `}
    ${tw` nth-3:( w-[150px] ) `}
    ${tw` nth-4:( w-[250px] ) `}
  }
`;

export const reviewListContent = css`
  ${tw` flex items-stretch gap-[2px] `}

  & > p {
    ${tw` p-[10px] border border-black-200 bg-black-50 shrink-0 `}
    ${tw` nth-1:( flex-[1] cursor-pointer ) `}
    ${tw` nth-1:hover:( bg-point-base/40 border-point-h-base ) `}
    ${tw` nth-2:( w-[150px] flex items-center justify-center ) `}
    ${tw` nth-3:( w-[150px] flex items-center justify-center ) `}
    ${tw` nth-4:( w-[250px] flex items-center justify-center ) `}
  }
`;

export const createReviewButtonBack = css`
  ${tw` mb-[30px] `}

  & > a {
    ${tw` p-[10px] w-[200px] border border-black-200 bg-black-50 text-center block `}
    ${tw` hover:( border-point-h-base bg-point-h-base text-white ) `}
  }
`;

export const createReviewForm = css`
  ${tw` flex flex-col gap-[2px] `}

  & > label {
    ${tw` flex items-stretch gap-[2px] `}

    & > span {
      ${tw` p-[10px] font-[900] shrink-0 w-[150px] border border-point-h-base bg-point-h-base flex items-center justify-center `}
    }

    & > input {
      ${tw` p-[10px] border border-black-200 bg-black-50 flex-[1] `}
      ${tw` focus:( border-point-h-base bg-point-base/40 ) `}
    }

    & > textarea {
      ${tw` resize-none outline-none p-[10px] border border-black-200 bg-black-50 flex-[1] h-[200px] `}
      ${tw` focus:( border-point-h-base bg-point-base/40 ) `}
    }

    &:nth-last-of-type(1) > input {
      ${tw` w-[100px] flex-none `}
    }
  }

  & > div.files {
    ${tw` flex items-center gap-[10px] py-[20px] `}

    & > input {
      ${tw` p-[10px] border border-black-200 bg-black-50 flex-[1] `}
      ${tw` focus:( border-point-h-base bg-point-base/40 ) `}
    }

    & > button {
      ${tw` shrink-0 w-[200px] border border-point-base bg-point-base p-[10px] `}
      ${tw` hover:( border-point-h-base bg-point-h-base ) `}
    }
  }

  & > div.button {
    ${tw` text-right mt-[20px] `}

    & > button {
      ${tw` shrink-0 w-[200px] border border-point-base bg-point-base p-[20px_10px] `}
      ${tw` hover:( border-point-h-base bg-point-h-base ) `}
    }
  }
`;
