import tw, { css } from 'twin.macro';

export const mileageBlockStyle = css`
  ${tw` p-[10px] border border-black-200 bg-black-50 text-center mb-[50px] mt-[50px] `}

  & span {
    ${tw` font-[900] mx-[5px] `}
  }
`;

export const mileageListStyle = css`
  ${tw` flex flex-col gap-[2px] mb-[50px] `}

  & > div.list-header,
  & > div.list-content {
    ${tw` flex items-center gap-[2px] `}

    & > p {
      ${tw` p-[10px] border shrink-0 `}
    }
  }

  & > div.list-header > p {
    ${tw` bg-point-h-base font-[900] flex items-center justify-center border-point-h-base flex-[1] `}
  }


  & > div.list-content > p {
    ${tw` bg-black-50 border-black-200 flex-[1] flex items-center `}
    ${tw` nth-1:( justify-center ) `}
    ${tw` nth-2:( justify-center ) `}
    ${tw` nth-3:( justify-end ) `}
    ${tw` nth-4:( justify-end ) `}
  }
`;
