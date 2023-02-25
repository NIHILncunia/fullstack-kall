import tw, { css } from 'twin.macro';

export const orderPageStyle = css`
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

export const fromInfoStyle = css`
  ${tw` flex flex-col gap-[2px] mb-[30px] `}

  & > div {
    ${tw` flex gap-[2px] `}

    & > p {
      ${tw` p-[10px] border border-solid `}
      ${tw` nth-1:bg-point-h-base nth-1:border-point-h-base nth-1:font-[900] nth-1:shrink-0 nth-1:basis-[200px] `}
      ${tw` nth-2:bg-black-50 nth-2:border-black-100 nth-2:flex-1 `}
    }
  }
`;

export const toInfoButtonStyle = css`
  ${tw` p-[5px_10px] ml-[10px] bg-point-base inline-block text-[90%] `}
  ${tw` hover:bg-point-h-base hover:text-white `}
`;

export const toInfoStyle = css`
  ${tw` flex flex-col gap-[2px] mb-[30px] `}

  & > div {
    ${tw` flex gap-[2px] `}

    & > p,
    & > input {
      ${tw` p-[10px] border border-solid `}
    }

    & > p {
      ${tw` font-[900] shrink-0 basis-[200px] bg-point-h-base border-point-h-base `}
    }

    & > input {
      ${tw` bg-black-50 border-black-100 flex-1 `}
      ${tw` focus:border-point-h-base focus:bg-point-base/40 `}
      ${tw` placeholder:text-black-base/70 `}
    }
  }
`;

export const itemListStyle = css`
  ${tw` flex flex-col gap-[2px] mb-[30px] `}

  & > div.list-header,
  & > div.list-content {
    ${tw` flex gap-[2px] items-center `}

    & > p {
      ${tw` p-[10px] border border-solid nth-1:flex-[1] nth-last-1:shrink-0 nth-last-1:basis-[150px] `}
    }
  }

  & > div.list-header {
    & > p {
      ${tw` flex justify-center bg-point-h-base border-point-h-base font-[900] `}
    }
  }

  & > div.list-content {
    & > p {
      ${tw` bg-black-50 border-black-100 nth-last-1:flex nth-last-1:justify-center `}
    }
  }
`;

export const payInfoStyle = css`
  ${tw` flex flex-col gap-[2px] mb-[30px] `}

  & > div.info-line {
    ${tw` flex gap-[2px] items-center `}

    & > p {
      ${tw` border border-solid p-[10px] `}
      ${tw` nth-1:bg-point-h-base nth-1:basis-[200px] nth-1:font-[900] nth-1:border-point-h-base `}
      ${tw` nth-2:bg-black-50 nth-2:border-black-100 nth-2:flex-[1] `}
    }

    & > select {
      ${tw` p-[10px] bg-black-50 border border-solid border-black-100 w-[200px] self-stretch focus:border-point-h-base focus:bg-point-base/40 `}
    }

    & > input {
      ${tw` p-[10px] bg-black-50 border border-solid border-black-100 flex-[1] `}
      ${tw` focus:border-point-h-base focus:bg-point-base/40 placeholder:text-black-base/70 `}
    }
  }

  & > span {
    ${tw` inline-block text-blue-500 font-[900] my-[5px] `}
  }

  & > div.info-message {
    ${tw` mt-[5px] text-red-500 `}

    & > p {
      ${tw` font-[900] `}
    }
  }
`;

export const paymentStyle = css`
  ${tw`  `}

  & > div.message-button {
    ${tw` text-center `}

    & > p {
      ${tw` font-[900] text-[1.4rem] mb-[10px] `}
    }

    & > button {
      ${tw` p-[20px_10px] w-[300px] text-center bg-point-base `}
      ${tw` hover:bg-point-h-base hover:text-white `}
    }
  }

  & > form {
    ${tw` flex flex-col gap-[2px] mt-[30px] `}

    & > label {
      ${tw` flex gap-[2px] items-center `}

      & > span {
        ${tw` shrink-0 basis-[200px] bg-point-h-base border border-solid border-point-h-base font-[900] p-[10px] `}
      }

      & > select {
        ${tw` p-[10px] bg-black-50 border border-solid border-black-100 w-[200px] self-stretch focus:border-point-h-base focus:bg-point-base/40 `}
      }

      & > input {
        ${tw` p-[10px] bg-black-50 border border-solid border-black-100 flex-[1] `}
        ${tw` focus:border-point-h-base focus:bg-point-base/40 placeholder:text-black-base/70 `}
      }
    }
  }
`;
