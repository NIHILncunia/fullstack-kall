import tw, { css } from 'twin.macro';

export const countStyle = css`
  ${tw` flex flex-col gap-[10px] mb-[20px] `}

  & > div {
    ${tw` flex gap-[10px] items-center `}

    & > input {
      ${tw` p-[10px] w-[100px] bg-black-50 `}
    }

    & > button {
      ${tw` p-[10px] bg-point-base block `}

    }
  }
`;

export const inputStyle = css`
  ${tw` mb-[20px] `}

  & > label {
    ${tw` flex flex-col gap-[10px] `}

    & > input {
      ${tw` w-full p-[10px] bg-black-50 placeholder:text-black-base/70 border border-solid border-black-100 `}
      ${tw` focus:bg-point-base/40 focus:border-point-base `}
    }
  }
`;

export const bottomMessageStyle = css`
  ${tw` text-red-500 font-[900] mb-[10px] `}
`;

export const bottomButtonStyle = css`
  ${tw` mb-[30px] bg-point-base text-black-base p-[20px_10px] w-full `}
  ${tw` hover:text-white hover:bg-point-h-base `}
`;

export const selectedItemStyle = css`
  ${tw` mb-[30px] `}

  & > p.count {
    ${tw` font-[900] text-[1.5rem] mb-[10px] `}
  }

  & > div {
    ${tw` flex gap-[10px] mb-[5px] nth-last-1:mb-[30px] items-center `}

    & > p {
      ${tw` nth-1:flex-[1] `}
    }

    & > button {
      ${tw` text-red-500 text-[1.5rem] `}
    }
  }

  & > p.total-price {
    ${tw` font-[900] text-[1.5rem] mb-[30px] `}
  }
`;
