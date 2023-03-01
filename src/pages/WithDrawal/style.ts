import tw, { css } from 'twin.macro';

export const withDrawalFormStyle = css`
  ${tw` flex flex-col gap-[30px] `}

  & > label {
    ${tw` flex flex-col gap-[10px] `}

    & > span {
      ${tw` font-[900] `}
    }

    & > textarea {
      ${tw` p-[10px] border border-solid border-black-200 bg-black-50 resize-none w-full h-[200px] outline-none `}
      ${tw` focus:border-point-h-base focus:bg-point-base/40 `}
    }
  }

  & > div {
    ${tw` flex gap-[20px] items-center `}

    & > button {
      ${tw` p-[20px_10px] bg-point-base shrink-0 flex-[1] `}
      ${tw` hover:text-white hover:bg-point-h-base `}
    }
  }
`;
