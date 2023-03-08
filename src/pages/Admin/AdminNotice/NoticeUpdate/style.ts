import tw, { css } from 'twin.macro';

export const formStyle = css`
  ${tw` flex flex-col gap-[2px] `}

  & > label {
    ${tw` flex items-stretch gap-[2px] `}

    & > span {
      ${tw` p-[10px] border border-point-h-base bg-point-h-base font-[900] shrink-0 w-[150px] flex items-center justify-center `}
    }

    & > input,
    & > textarea,
    & > select {
      ${tw` p-[10px] border border-black-200 bg-black-50 `}
      ${tw` focus:( border-point-h-base bg-point-base/40 ) `}
    }

    & > input,
    & > textarea {
      ${tw` w-full `}
    }

    & > textarea {
      ${tw` text-justify resize-none h-[300px] outline-none `}
    }
  }

  & > div {
    ${tw` mt-[30px] text-right `}

    & > button {
      ${tw` p-[20px_10px] bg-point-base w-[200px] `}
      ${tw` hover:( text-white bg-point-h-base ) `}
    }
  }
`;
