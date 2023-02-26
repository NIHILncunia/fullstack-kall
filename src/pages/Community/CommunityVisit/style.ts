import tw, { css } from 'twin.macro';

export const visitInfoStyle = css`
  ${tw` flex flex-col gap-[2px] `}

  & > div {
    ${tw` flex gap-[2px] items-center `}

    & > p {
      ${tw` p-[10px] border border-solid `}

      &:nth-of-type(1) {
        ${tw` shrink-0 w-[150px] bg-point-h-base font-[900] border-point-h-base flex items-center justify-center `}
      }

      &:nth-of-type(2) {
        ${tw` flex-[1] bg-black-50 border-black-100 `}
      }
    }
  }
`;
