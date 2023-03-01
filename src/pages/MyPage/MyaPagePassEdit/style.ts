import tw, { css } from 'twin.macro';

export const passEditFormStyle = css`
  ${tw` flex flex-col gap-[2px] w-[600px] mx-auto `}

  & > label {
    ${tw` flex items-center gap-[2px] `}

    & > span {
      ${tw` p-[10px] border border-solid border-point-h-base font-[900] bg-point-h-base w-[200px] shrink-0 `}
    }

    & > input {
      ${tw` flex-[1] p-[10px] border border-black-200 border-solid bg-black-50 placeholder:text-black-base/70 `}
      ${tw` focus:bg-point-base/40 focus:border-point-h-base `}
    }
  }

  & > div {
    ${tw` flex items-center gap-[20px] mt-[30px] `}

    & > button {
      ${tw` bg-point-base p-[20px_10px] shrink-0 flex-[1] `}
      ${tw` hover:text-white hover:bg-point-h-base `}
    }
  }
`;
