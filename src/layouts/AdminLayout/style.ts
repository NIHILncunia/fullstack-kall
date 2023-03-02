import tw, { css } from 'twin.macro';

export const adminMenuStyle = css`
  ${tw` grid grid-cols-4 mb-[30px] `}

  & > a {
    ${tw` flex items-center justify-center border border-solid border-black-200 bg-black-50 p-[20px_10px] `}
    ${tw` hover:border-point-h-base hover:bg-point-base/40 `}
  }
`;
