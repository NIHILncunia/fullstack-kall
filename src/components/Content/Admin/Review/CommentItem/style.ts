import tw, { css } from 'twin.macro';

export const commentItemStyle = css`
  ${tw` border border-solid border-black-200 flex flex-col `}

  & > div:nth-of-type(1) {
    ${tw` flex items-center divide-x divide-solid divide-black-200 border-b border-solid border-b-black-200 bg-black-50 `}

    & > div {
      ${tw` nth-1:( flex-[1] ) `}
      ${tw` nth-3:( shrink-0 w-[250px] text-center ) `}

      &:nth-of-type(1) {
        ${tw` flex items-center justify-start `}

        & > span {
          ${tw` flex-[1] p-[10px] `}
        }

        & > button {
          ${tw` text-black-base cursor-pointer py-[10px] `}
          ${tw` hover:text-red-500 `}
          ${tw` mr-[10px] `}
        }

        & > input {
          ${tw` p-[10px] bg-point-base/40 flex-[1] mr-[10px] `}
        }
      }

      &:nth-of-type(2) {
        ${tw` p-[10px] `}
      }

      &:nth-of-type(3) {
        ${tw` shrink-0 `}
      }
    }
  }

  & > div:nth-of-type(2) {
    ${tw` p-[10px] `}
  }

  & > input {
    ${tw` p-[10px] bg-point-base/40 `}
  }
`;
