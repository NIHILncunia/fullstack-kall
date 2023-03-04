import tw, { css } from 'twin.macro';

export const addressUpdateFormStyle = css`
  ${tw` p-[10px] mb-[10px] border border-black-200 border-solid bg-black-50 flex flex-col gap-[2px] `}

  & input {
    ${tw` border-2 border-solid border-point-base placeholder:text-black-base/70 p-[10px] `}
    ${tw` focus:border-point-h-base `}
  }

  & > div:nth-of-type(1) {
    ${tw` flex items-center justify-center gap-[2px] `}

    & > input {
      ${tw` shrink-0 flex-[1] `}
    }
  }

  & > div:nth-of-type(2) {
    ${tw` text-right mt-[10px] `}

    & > button {
      ${tw` bg-point-base p-[20px_10px] w-[200px] `}
      ${tw` hover:bg-point-h-base hover:text-white `}
    }
  }
`;
