import tw, { css } from 'twin.macro';

export const defaultAddressStyle = css`
  ${tw` mb-[30px] flex flex-col gap-[2px] `}

  & > div {
    ${tw` flex items-center gap-[2px] `}

    & > p {
      ${tw` border border-solid p-[10px] `}
      ${tw` nth-1:shrink-0 nth-1:w-[150px] nth-2:flex-[1] `}
    }

    &.list-header {
      & > p {
        ${tw` bg-point-h-base border-point-h-base font-[900] flex items-center justify-center `}
      }
    }

    &.list-none {
      ${tw` text-center `}

      & > p {
        ${tw` font-[900] w-full `}
      }
    }

    &.list-content {
      & > p {
        ${tw` bg-black-50 border-black-200 flex items-center `}
      }
    }
  }
`;

export const addressListStyle = css`
  ${tw` flex flex-col gap-[2px] `}

  & > div {
    ${tw` flex items-stretch gap-[2px] `}

    & > p {
      ${tw` border border-solid p-[10px] `}
      ${tw` nth-1:shrink-0 nth-1:w-[70px] nth-2:w-[150px] `}
      ${tw` nth-3:shrink-0 nth-3:flex-[1] `}
    }

    &.list-header {
      & > p {
        ${tw` bg-point-h-base border-point-h-base font-[900] flex items-center justify-center `}
      }
    }

    &.list-none {
      ${tw` text-center `}

      & > p {
        ${tw` font-[900] w-full `}
      }
    }

    &.list-content {
      & > p {
        ${tw` bg-black-50 border-black-200 `}
        ${tw` flex items-center nth-1:flex nth-1:items-center nth-1:justify-center `}

        & > label {
          ${tw` text-[2rem] `}

          & input+span {
            ${tw` text-black-200 `}
          }

          & input:checked+span {
            ${tw` text-point-h-link `}
          }
        }
      }
    }
  }
`;

export const addressButtonStyle = css`
  ${tw` p-[20px_10px] bg-point-base w-[200px] mx-auto block `}
  ${tw` hover:text-white hover:bg-point-h-base `}
`;
