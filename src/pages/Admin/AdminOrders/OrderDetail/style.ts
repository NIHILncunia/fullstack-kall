import tw, { css } from 'twin.macro';

export const orderUpdateStyle = css`
  ${tw` flex flex-col gap-[2px] w-[650px] mb-[30px] `}

  & > label {
    ${tw` flex items-stretch gap-[2px] `}

    & > span {
      ${tw` shrink-0 w-[150px] bg-point-h-base border border-solid border-point-h-base font-[900] flex items-center justify-center p-[10px] `}
    }

    & > input {
      ${tw` shrink-0 flex-[1] border border-solid border-black-200 bg-black-50 placeholder:text-black-base/70 p-[10px] `}
      ${tw` focus:( border-point-h-base bg-point-base/40 ) `}
      ${tw` disabled:( text-black-base/50 ) `}
    }

    & > select {
      ${tw` shrink-0 flex-[1] border border-solid border-black-200 bg-black-50 p-[10px] `}
      ${tw` focus:( border-point-h-base bg-point-base/40 ) `}
      ${tw` disabled:( text-black-base/50 ) `}
    }
  }

  & > div {
    ${tw` mt-[10px] flex items-center gap-[20px] `}

    & > button {
      ${tw` p-[20px_10px] bg-point-base flex-[1] `}
      ${tw` hover:( bg-point-h-base text-white ) `}
    }
  }
`;

export const orderDetailListStyle = css`
  ${tw` flex flex-col gap-[10px] w-[650px] `}
`;
