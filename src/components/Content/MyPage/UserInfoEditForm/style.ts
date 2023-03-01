import tw, { css } from 'twin.macro';

export const userInfoEditStyle = css`
  ${tw` flex flex-col gap-[2px] w-[600px] mx-auto `}

  & > label {
    ${tw` flex items-center gap-[2px] `}

    & > span {
      ${tw` block p-[10px] border border-solid border-point-h-base font-[900] bg-point-h-base shrink-0 w-[150px] `}
    }

    & > input {
      ${tw` flex-[1] border border-solid border-black-200 bg-black-50 p-[10px] placeholder:text-black-base/70 `}
      ${tw` focus:bg-point-base/40 focus:border-point-h-base `}

      &:disabled {
        ${tw` bg-black-50/40 border-black-200/40 text-black-base/40 `}
      }
    }
  }

  & > p {
    ${tw` text-red-500 font-[900] mb-[5px] nth-last-1:mb-0 `}
  }

  & > div {
    ${tw` flex items-start gap-[20px] `}

    & > button {
      ${tw` w-full p-[20px_10px] bg-point-base mt-[30px] `}
      ${tw` hover:text-white hover:bg-point-h-base `}
    }
  }
`;
