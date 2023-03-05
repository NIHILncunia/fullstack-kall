import tw, { css } from 'twin.macro';

export const imageEditStyle = css`
  ${tw` mb-[30px] `}

  & > img {
    ${tw` w-[500px] h-[500px] border border-solid border-black-base mb-[10px] `}
  }

  & > div {
    ${tw` flex gap-[2px] `}

    & > input {
      ${tw` shrink-0 w-[500px] p-[10px] border border-solid border-black-200 bg-black-50 `}
      ${tw` placeholder:text-black-base/70 focus:( bg-point-base/40 border-point-h-base ) `}
    }

    & > button {
      ${tw` p-[10px] border border-solid border-point-base bg-point-base w-[150px] `}
      ${tw` hover:( bg-point-h-base text-white border-point-h-base ) `}
    }
  }
`;

export const basicInfoEditStyle = css`
  ${tw` flex flex-col gap-[2px] w-[652px] mb-[30px] `}

  & > label {
    ${tw` flex items-center gap-[2px] `}

    & > span {
      ${tw` shrink-0 w-[150px] border border-solid border-point-h-base bg-point-h-base font-[900] p-[10px] flex items-center justify-center `}
    }

    & > input {
      ${tw` shrink-0 w-[500px] p-[10px] bg-black-50 placeholder:text-black-base/70 border border-solid border-black-200 `}
      ${tw` focus:( bg-point-base/40 border-point-h-base ) `}
    }
  }

  & > button {
    ${tw` p-[10px] bg-point-base w-[200px] mt-[10px] `}
    ${tw` hover:( bg-point-h-base text-white ) `}
  }
`;

export const detailImagesEditStyle = css`
  ${tw` flex flex-col gap-[10px] w-[652px] `}

  & > button {
    ${tw` p-[10px] bg-point-base w-[200px] `}
    ${tw` hover:( bg-point-h-base text-white ) `}
  }

  & > div {
    ${tw` flex flex-col gap-[2px] `}

    & > div {
      ${tw` p-[10px] border border-solid border-black-200 bg-black-50 flex items-center gap-[20px] `}

      & > span {
        ${tw` nth-1:( flex-[1] ) `}
        ${tw` nth-2:( cursor-pointer ) `}
      }
    }
  }
`;

export const textAreaInfoStyle = css`
  & > textarea {
    ${tw` p-[10px] w-[652px] border border-solid border-black-200 bg-black-50 outline-none resize-none h-[200px] `}
    ${tw` focus:( bg-point-base/40 border-point-h-base ) `}
  }
`;
