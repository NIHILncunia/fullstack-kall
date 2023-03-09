import tw, { css } from 'twin.macro';

export const directUpdateFormStyle = css`
  ${tw` flex flex-col gap-[2px] `}

  & > label {
    ${tw` flex items-stretch gap-[2px] `}

    & > span {
      ${tw` p-[10px] border border-point-h-base bg-point-h-base font-[900] flex items-center justify-center shrink-0 w-[150px] `}
    }

    & > textarea {
      ${tw` p-[10px] w-full border border-black-200 bg-black-50 resize-none outline-none h-[200px] `}
      ${tw` focus:( border-point-h-base bg-point-base/40 ) `}
    }

    & > input {
      ${tw` p-[10px] w-full border-black-200 bg-black-50 border `}
      ${tw` focus:( border-point-h-base bg-point-base/40 ) `}
    }

    & > select {
      ${tw` shrink-0 w-[200px] p-[10px] border border-black-200 bg-black-50 `}
      ${tw` focus:( border-point-h-base bg-point-base/40 ) `}
    }
  }
`;

export const directUpdateButtonStyle = css`
  ${tw` text-right mt-[30px] `}

  & > button {
    ${tw` w-[200px] bg-point-base p-[10px] `}
    ${tw` hover:( bg-point-h-base text-white ) `}
  }
`;
