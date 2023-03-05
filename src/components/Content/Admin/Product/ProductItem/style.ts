import tw, { css } from 'twin.macro';

export const listItemEditStyle = css`
  ${tw` mb-[30px] flex items-center justify-end p-[10px] border border-solid border-black-200 bg-black-50 `}

  & > button {
    ${tw` p-[10px] w-[200px] bg-point-base `}
    ${tw` hover:( text-white bg-point-h-base ) `}
  }
`;
