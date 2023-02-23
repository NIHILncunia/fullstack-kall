import tw, { css } from 'twin.macro';

export const cartPageStyle = css`
  ${tw` py-[50px] text-[1.2rem] text-black-base `}
`;

export const orderProgressStyle = css`
  ${tw` flex items-center divide-x-2 divide-point-h-base border-2 border-point-h-base mb-[50px] `}

  & > p {
    ${tw` flex-1 text-[1.5rem] text-center bg-black-50 p-[10px] text-black-base/50 font-[900] `}

    &.selected {
      ${tw` bg-point-h-base text-black-base `}
    }
  }
`;

export const cartListStyle = css`
  ${tw` flex flex-col gap-[2px] mb-[50px] `}

  & label.checkbox {
    & > input+div {
      ${tw` flex items-center justify-center w-[30px] h-[30px] p-[5px] bg-point-base `}

      & > svg {
        ${tw` hidden text-point-h-link `}
      }
    }

    & > input:checked+div > svg {
      ${tw` block `}
    }
  }

  & > div.list-header,
  & > div.list-content {
    ${tw` flex gap-[2px] items-center `}

    & > div {
      ${tw` p-[10px] h-[50px] flex items-center nth-last-1:w-[150px] nth-2:flex-[1] `}
    }
  }

  & > div.list-header {
    & > div {
      ${tw` bg-point-h-base font-[700] justify-center `}
    }
  }

  & > div.list-content {
    & > div {
      ${tw` bg-black-50 border border-black-100 nth-last-1:justify-center `}
    }

    & label.checkbox > input+div {
      ${tw` bg-black-100 `}

      & > svg {
        ${tw` text-black-base/70 `}
      }
    }
  }
`;

export const listStatStyle = css`
  ${tw` flex flex-col gap-[2px] text-[1.2rem] mb-[50px] `}

  & > div.stat-top,
  & > div.stat-bottom {
    & > p {
      ${tw` p-[10px] bg-black-50 border border-black-100 flex items-center gap-[5px] justify-center `}

      & > svg {
        ${tw` pb-[2px] `}
      }
    }
  }

  & > div.stat-top {
    ${tw` flex gap-[2px] `}

    & > p {
      ${tw` flex-[1] `}
    }
  }

  & > div.stat-bottom {
    ${tw` text-[1.5rem] `}

    & > p {
      ${tw` font-[700] `}
    }
  }
`;

export const buttonsStyle = css`
  ${tw` flex gap-[10px] items-center justify-end text-[1.2rem] `}

  & > button {
    ${tw` bg-point-base p-[20px_10px] w-[200px] `}
    ${tw` hover:bg-point-h-base hover:text-white `}
  }
`;
