import tw, { css } from 'twin.macro';

export const passCheckStyle = css`
  ${tw` mb-[300px] w-[600px] mx-auto `}

  & > p:nth-of-type(1) {
    ${tw` mb-[20px] text-center `}
  }

  & > input {
    ${tw` p-[10px] bg-black-50 border border-solid border-black-200 w-full text-center `}
    ${tw` placeholder:text-black-base/70 `}
    ${tw` focus:border-point-h-base focus:bg-point-base/40 `}
  }

  & > p:nth-of-type(2) {
    ${tw` text-red-500 font-[900] mt-[10px] text-center `}
  }

  & > button {
    ${tw` w-full p-[20px_10px] mt-[20px] bg-point-base `}
    ${tw` hover:bg-point-h-base hover:text-white `}
  }
`;
