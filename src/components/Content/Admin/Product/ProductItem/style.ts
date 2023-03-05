import tw, { css } from 'twin.macro';

export const listItemEditStyle = css`
  ${tw` mb-[30px] mt-[10px] flex items-center !gap-[20px] justify-end `}

  & > button {
    ${tw` p-[10px] w-[200px] bg-point-base `}
    ${tw` hover:( text-white bg-point-h-base ) `}
  }
`;
