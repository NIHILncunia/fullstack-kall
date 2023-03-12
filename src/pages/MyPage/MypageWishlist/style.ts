import tw, { css } from 'twin.macro';

export const wishlistGrid = css`
  ${tw` grid grid-cols-4 gap-[20px] `}
`;

export const wishlistItem = css`
  ${tw` p-[10px] border-[2px] border-black-200/50 flex flex-col gap-[10px] `}
  ${tw` hover:( border-point-h-base ) `}

  & > div:nth-of-type(1) {
    ${tw` relative `}

    & > img {
      ${tw` bg-black-base w-full h-[200px] `}
    }

    & > button {
      ${tw` text-red-300 absolute right-[10px] bottom-[10px] text-[1.5rem] rounded-[50%] p-[10px] border-[2px] border-red-300 `}
      ${tw` hover:( text-red-500 border-red-500 ) `}
    }
  }

  & > div:nth-of-type(2) {
    ${tw` text-[1.5rem] `}

    & > a {
      ${tw` font-[900] text-point-link `}
      ${tw` hover:( text-point-h-link underline ) `}
    }
  }

  & > div:nth-of-type(3) {
    ${tw` flex-[1] `}
  }

  & > p {
    ${tw` justify-start text-[1.5rem] `}
  }
`;
