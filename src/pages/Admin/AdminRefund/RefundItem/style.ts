import tw, { css } from 'twin.macro';

export const refundDataStyle = css`
  ${tw` mb-[30px] flex flex-col gap-[2px] `}

  & > div.data-title,
  & > div.data-content,
  & > div.data-status,
  & > div.data-image {
    ${tw` flex items-stretch gap-[2px] `}

    & > p {
      ${tw` p-[10px] border border-solid `}
      ${tw` nth-1:( border-point-h-base font-[900] bg-point-h-base w-[150px] shrink-0 flex items-center justify-center ) `}
      ${tw` nth-2:( border-black-200 bg-black-50 shrink-0 flex-[1] ) `}
    }

    & > textarea {
      ${tw` p-[10px] border border-solid border-black-200 bg-black-50 resize-none w-full h-[200px] `}
    }

    & > select {
      ${tw` p-[10px] w-[200px] border border-solid border-black-200 bg-black-50 outline-none `}
      ${tw` focus:( border-point-h-base bg-point-base/40 ) `}
      ${tw` disabled:( text-black-base/50 border-black-100 ) `}
    }

    & > img {
      ${tw` shrink-0 block w-[300px] nth-1:mr-[20px] h-[300px] bg-black-base `}
    }

    & > button {
      ${tw` border border-solid border-point-base bg-point-base p-[10px] w-[100px] `}
      ${tw`hover:( border-point-h-base bg-point-h-base text-white ) `}
    }
  }

  & > div.data-image {
    ${tw` mt-[30px] `}
  }
`;

export const orderDetailDataStyle = css`
  ${tw` p-[10px] border border-solid border-black-200 bg-black-50 flex items-stretch gap-[20px] `}

  & > img {
    ${tw` block w-[200px] h-[200px] bg-black-base `}
  }

  & > div {
    ${tw` flex flex-col gap-[2px] text-[1.5rem] `}

    & > h3 {
      ${tw` font-[900] text-[2rem] `}
    }

    & > p {
      ${tw` nth-1:( flex-[1] ) `}
    }
  }
`;
