import tw, { css } from 'twin.macro';

export const formStyle = css`
  ${tw` flex flex-col gap-[20px] `}

  & > label {
    & > span {
      ${tw` block mb-[5px] `}
    }

    & > input {
      ${tw` p-[10px] bg-black-50 placeholder:text-black-base/70 border border-solid border-black-100 w-full `}
      ${tw` focus:border-point-h-base focus:bg-point-base/40 `}
    }

    & > select {
      ${tw` p-[10px] bg-black-50 border border-solid border-black-100 w-[200px] outline-none `}
      ${tw` focus:border-point-h-base focus:bg-point-base/40 `}
    }

    & > textarea {
      ${tw` p-[10px] bg-black-50 border border-solid border-black-100 w-full h-[300px] outline-none resize-none `}
      ${tw` focus:border-point-h-base focus:bg-point-base/40 `}
    }
  }

  & > button {
    ${tw` p-[20px_10px] bg-point-base `}
    ${tw` hover:bg-point-h-base hover:text-white `}
  }
`;
