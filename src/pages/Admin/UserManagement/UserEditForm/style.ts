import tw, { css } from 'twin.macro';

export const userEditFormStyle = css`
  ${tw` flex flex-col gap-[2px] items-start `}

  & > label {
    ${tw` flex items-center gap-[2px] `}

    & > span {
      ${tw` p-[10px] border border-solid border-point-h-base bg-point-h-base shrink-0 w-[150px] font-[900] `}
    }

    & > input {
      ${tw` p-[10px] border border-solid border-black-200 bg-black-50 w-[400px] `}
      ${tw` focus:bg-point-base/40 focus:border-point-h-base `}
    }
  }

  & > div {
    ${tw` flex gap-[20px] mt-[30px] `}

    & > button {
      ${tw` p-[20px_10px] bg-point-base w-[200px] `}
      ${tw` hover:bg-point-h-base hover:text-white `}
    }
  }
`;
