import tw, { css } from 'twin.macro';

export const addressFormStyle = css`
  ${tw` flex flex-col gap-[2px] mb-[30px] `}

  & input {
    ${tw` p-[10px] border border-solid border-black-200 bg-black-50 `}
    ${tw` focus:border-point-h-base focus:bg-point-base/40 `}
  }

  & > div:nth-of-type(1) input {
    ${tw` shrink-0 w-[150px] mb-[10px] `}
  }

  & > div:nth-of-type(2) {
    ${tw` flex items-center gap-[2px] `}

    & > input {
      ${tw` shrink-0 w-[100px] text-center `}
    }

    & > button {
      ${tw` p-[10px] bg-point-base border border-solid border-point-base `}
      ${tw` hover:bg-point-h-base hover:text-white hover:border-point-h-base `}
    }
  }

  & > button {
    ${tw` p-[10px] bg-point-base border border-solid border-point-base w-[200px] mt-[10px] ml-auto block `}
    ${tw` hover:bg-point-h-base hover:text-white hover:border-point-h-base `}
  }
`;
