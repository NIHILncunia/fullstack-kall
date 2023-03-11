import tw, { css } from 'twin.macro';

export const buttonControlls = css`
  ${tw` mb-[30px] flex items-center gap-[20px] `}

  & > button {
    ${tw` p-[10px] border border-black-200 bg-black-50 `}
    ${tw` hover:( border-point-h-base bg-point-h-base text-white ) `}
  }
`;

export const deliveryList = css`
  ${tw` flex flex-col gap-[2px] `}

  & > div:not(div.list-detail) {
    ${tw` flex items-stretch gap-[2px] `}

    & > p {
      ${tw` p-[10px] border shrink-0 `}
      ${tw` nth-1:( w-[100px] ) `}
      ${tw` nth-2:( flex-[1] ) `}
      ${tw` nth-3:( w-[150px] ) `}
      ${tw` nth-4:( w-[250px] ) `}
    }

    &.list-header > p {
      ${tw` border-point-h-base bg-point-h-base flex items-center justify-center font-[900] `}
    }

    &.list-content > p {
      ${tw` border-black-200 bg-black-50 `}
      ${tw` nth-2:( flex items-center gap-[10px] ) `}
      ${tw` nth-1:( flex items-center justify-center ) `}
      ${tw` nth-1:hover:( border-point-h-base bg-point-base/40 ) `}
      ${tw` nth-3:( flex items-center justify-center ) `}
      ${tw` nth-4:( flex items-center justify-center ) `}

      &:nth-of-type(1) {
        ${tw` p-0 `}

        & > a {
          ${tw` p-[10px] flex items-center justify-center flex-[1] h-full `}
        }
      }

      &:nth-of-type(2) {
        & > span {
          ${tw`  `}
        }

        & > button {
          ${tw` p-[10px] border bg-point-base/40 border-point-h-base w-[150px] shrink-0 `}
          ${tw` hover:( bg-point-h-base text-white ) `}
        }
      }
    }
  }
`;

export const listDetail = css`
  ${tw` p-[10px] border border-black-200 flex flex-col gap-[10px] text-[1.5rem] `}

  & > div {
    ${tw` p-[10px] border border-inherit bg-black-50 flex gap-[20px] `}

    & > img {
      ${tw` block shrink-0 w-[200px] h-[200px] bg-black-base `}
    }

    & > div {
      ${tw` flex flex-col gap-[10px] `}

      & > p {
        ${tw` nth-3:( flex-[1] shrink-0 ) `}
      }
    }
  }
`;
