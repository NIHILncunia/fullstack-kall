import tw, { css } from 'twin.macro';

export const radioStyle = css`
  ${tw` mb-[20px] `}

  & > p {
    ${tw` mb-[5px] `}
  }

  & > div {
    ${tw` flex gap-[10px] `}

    & input {
      ${tw` hidden `}
    }

    & input+span {
      ${tw` p-[10px] bg-black-50 text-black-base block cursor-pointer border border-solid border-black-100 `}
    }

    & input:checked+span {
      ${tw` bg-point-h-base text-white border-point-h-base `}
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

export const fileInputStyle = css`
  ${tw` mb-[20px] `}

  & > span {
    ${tw` w-full block mb-[10px] `}
  }

  & > div {
    ${tw` flex gap-[10px] items-center `}

    & > input {
      ${tw` flex-[1] bg-black-50 p-[10px] `}
    }

    & > button {
      ${tw` bg-point-base text-black-base p-[10px] `}
      ${tw` hover:text-white hover:bg-point-h-base `}
    }
  }
`;

export const selectButton = css`
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
      ${tw` nth-1:flex-[1]`}
    }

    & > div {
      ${tw` flex items-center gap-[5px] `}

      & > button {
        ${tw` bg-point-base p-[5px] block w-[35px] `}
      }

      & > input {
        ${tw` bg-black-50 p-[5px] w-[100px] text-center `}
      }
    }

    & > button {
      ${tw` text-red-500 text-[1.5rem] `}
    }
  }

  & > p.total-price {
    ${tw` font-[900] text-[1.5rem] mb-[30px] `}
  }
`;
