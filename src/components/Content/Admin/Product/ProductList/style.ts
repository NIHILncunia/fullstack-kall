import tw, { css } from 'twin.macro';

export const productListStyle = css`
  ${tw` flex flex-col gap-[2px] `}

  & > div {
    ${tw` flex items-center gap-[2px] `}

    &.list-header {
      & > div {
        ${tw` font-[900] bg-point-h-base border-point-h-base `}
      }
    }

    &.list-content {
      & > div {
        ${tw` border-black-200 bg-black-50 `}
        ${tw` nth-3:hover:( bg-point-base/40 border-point-h-base cursor-pointer ) `}
      }
    }

    & > div {
      ${tw` border border-solid p-[10px] `}
      ${tw` nth-1:( w-[70px] flex justify-center shrink-0 ) `}
      ${tw` nth-2:( flex justify-center w-[200px] shrink-0 ) `}
      ${tw` nth-3:( flex-[1] shrink-0 ) `}
      ${tw` nth-4:( shrink-0 w-[100px] flex justify-center ) `}
      ${tw` nth-5:( shrink-0 w-[150px] flex justify-center ) `}

      & > input {
        ${tw` w-[30px] h-[30px] `}
      }
    }
  }
`;

export const itemCategoryButtonStyle = css`
  ${tw` flex items-center gap-[20px] mb-[30px] `}

  & > button {
    ${tw` p-[10px] bg-point-base shrink-0 flex-[1] `}
    ${tw` hover:text-white hover:bg-point-h-base `}
  }
`;

export const itemControllButtonStyle = css`
  ${tw` flex items-center gap-[20px] mb-[30px] `}

  & > button {
    ${tw` p-[10px] bg-point-base shrink-0 flex-[1] `}
    ${tw` hover:text-white hover:bg-point-h-base `}
  }
`;
