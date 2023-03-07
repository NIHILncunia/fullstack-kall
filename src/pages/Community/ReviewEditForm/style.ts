import tw, { css } from 'twin.macro';

export const reviewUpdateFormStyle = css`
  ${tw` flex flex-col gap-[2px] `}

  & > label {
    ${tw` flex gap-[2px] `}

    & > span {
      ${tw` p-[10px] border border-solid border-point-h-base flex items-center justify-center font-[900] shrink-0 w-[150px] bg-point-h-base `}
    }

    & > input,
    & > textarea {
      ${tw` p-[10px] border border-solid border-black-200 bg-black-50 flex-[1] `}
    }

    & > textarea {
      ${tw` resize-none h-[300px] `}
    }

    &:nth-of-type(3) input {
      ${tw` shrink-0 w-[200px] flex-[0] `}
    }
  }
`;

export const buttonStyle = css`
  ${tw` mt-[30px] flex items-center gap-[20px] justify-end `}

  & > button {
    ${tw` p-[20px_10px] bg-point-base w-[200px] `}
    ${tw` hover:( text-white bg-point-h-base ) `}
  }
`;
