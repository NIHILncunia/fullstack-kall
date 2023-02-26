import tw, { css } from 'twin.macro';

export const articleListStyle = css`
  ${tw` divide-y-[2px] divide-solid divide-black-base/30 my-[-20px] border-b-[1px] border-solid border-b-black-base `}

  & > div {
    ${tw` flex items-center `}

    &.list-header {
      ${tw` bg-point-h-base `}

      & > p {
        ${tw` font-[900] `}

        &:nth-of-type(2) {
          ${tw` p-[10px] flex justify-center items-center `}
        }
      }
    }

    &.list-content {
      ${tw` hover:bg-black-50 `}

      & > p:nth-of-type(2) a {
        ${tw` p-[10px] block text-point-link `}
        ${tw` hover:text-point-h-link hover:underline `}
      }
    }

    & > p {
      &:nth-of-type(1),
      &:nth-of-type(3),
      &:nth-of-type(4) {
        ${tw` p-[10px] shrink-0 flex justify-center items-center `}
      }

      &:nth-of-type(1) {
        ${tw` w-[80px] `}
      }

      &:nth-of-type(2) {
        ${tw` flex-[1] `}
      }

      &:nth-of-type(3) {
        ${tw` w-[220px] `}
      }

      &:nth-of-type(4) {
        ${tw` w-[150px] `}
      }
    }
  }
`;
