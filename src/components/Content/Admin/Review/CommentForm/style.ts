import tw, { css } from 'twin.macro';

export const commentFormStyle = css`
  ${tw` p-[10px] border border-solid border-black-200 mb-[30px] `}

  & > div.input {
    ${tw` flex flex-col items-start gap-[5px] w-full `}

    & > input {
      ${tw` placeholder:text-black-base/70 w-full p-[10px] border border-black-200 bg-black-50 `}
      ${tw` nth-1:w-[500px] `}
      ${tw` focus:( border-point-h-base bg-point-base/40 ) `}
    }
  }

  & > div.button {
    ${tw` mt-[10px] text-right `}

    & > button {
      ${tw` p-[20px_10px] bg-point-base w-[200px] `}
      ${tw` hover:( bg-point-h-base text-white ) `}
    }
  }
`;
