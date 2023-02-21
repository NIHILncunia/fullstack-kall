import tw, { css } from 'twin.macro';

export const tagControllerStyle = css`
  ${tw` mb-[50px] text-[1.2rem] text-black-base `}

  & > p {
    ${tw` mb-[10px] `}
  }

  & > div.tags {
    ${tw` flex gap-[10px] mb-[10px] `}

    & > label {
      & > input+span {
        ${tw` block bg-point-pink p-[5px_10px] select-none cursor-pointer border-solid border-point-pink border-[1px] `}
        ${tw` hover:border-solid hover:border-pink-200 hover:border-[1px] `}
      }

      & > input:checked+span {
        ${tw` bg-point-h-pink `}
      }
    }
  }

  & > div.button {
    ${tw` text-right `}

    & > button {
      ${tw` text-[1.2rem] bg-point-base text-black-base p-[10px_20px] `}
      ${tw` hover:bg-point-h-base hover:text-white `}
    }
  }
`;

export const alignButtonStyle = css`
  ${tw` text-right text-[1.2rem] mb-[30px] `}

  & > div {
    ${tw` inline-flex items-center justify-end divide-point-h-base divide-solid divide-x-[1px] border border-point-h-base border-solid `}

    & > label {
      & > input+span {
        ${tw` block p-[5px_10px] bg-blue-50 cursor-pointer `}
      }

      & > input:checked+span {
        ${tw` bg-point-h-base text-white `}
      }
    }
  }
`;
