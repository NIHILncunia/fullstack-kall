import tw, { css } from 'twin.macro';

export const updateFormStyle = css`
  ${tw` flex flex-col gap-[2px] `}

  & > label {
    ${tw` flex items-stretch gap-[2px] `}

    & > span,
    & > input,
    & > textarea {
      ${tw` p-[10px] border border-solid `}
    }

    & > span {
      ${tw` border-point-h-base font-[900] flex items-center justify-center bg-point-h-base shrink-0 w-[150px] `}
    }

    & > input,
    & > textarea {
      ${tw` border-black-200 bg-black-50 shrink-0 flex-[1] `}
      ${tw` focus:( border-point-h-base bg-point-base/40 ) `}
    }

    & > textarea {
      ${tw` resize-none outline-none h-[200px] `}
    }
  }

  & > div {
    ${tw` mt-[30px] text-right `}

    & > button {
      ${tw` p-[20px_10px] bg-point-base w-[200px] `}
      ${tw` hover:( bg-point-h-base text-white ) `}
    }
  }
`;
