import tw, { css } from 'twin.macro';

export const orderCompletePageStyle = css`
  ${tw` p-[75px] text-[1.2rem] text-black-base `}
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

export const orderCompleteMessageStyle = css`
  ${tw` text-center py-[100px] mb-[30px] `}

  & > p {
    ${tw` font-[900] text-[1.5rem] `}
  }
`;

export const orderInfoStyle = css`
  ${tw` flex flex-col gap-[2px] mb-[30px] `}

  & > div {
    ${tw` flex gap-[2px] items-center `}

    & > p {
      ${tw` p-[10px] border border-solid `}
      ${tw` nth-1:basis-[200px] nth-1:shrink-0 nth-1:border-point-h-base nth-1:bg-point-h-base nth-1:font-[900] `}
      ${tw` nth-2:flex-[1] nth-2:bg-black-50 nth-2:border-black-100 `}
    }
  }
`;

export const detailListStyle = css`
  ${tw` flex flex-col gap-[2px] mb-[30px] `}

  & > div {
    ${tw` flex gap-[2px] items-center `}

    &.list-header > p,
    &.list-content > p {
      ${tw` p-[10px] border border-solid `}
      ${tw` nth-1:flex-[1] `}
      ${tw` nth-2:basis-[150px] nth-2:shrink-0 nth-2:flex nth-2:justify-center `}
    }

    &.list-header > p {
      ${tw` bg-point-h-base border-point-h-base font-[900] flex justify-center `}
    }

    &.list-content > p {
      ${tw` bg-black-50 border-black-100 `}
    }
  }
`;

export const buttonStyle = css`
  ${tw` block mx-auto w-[400px] p-[20px_10px] bg-point-base `}
  ${tw` hover:bg-point-h-base hover:text-white `}
`;
