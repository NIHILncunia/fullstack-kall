import tw, { css } from 'twin.macro';

export const adminLinkStyle = css`
  ${tw` grid grid-cols-3 text-[2rem] `}

  & > a {
    ${tw` h-[200px] flex items-center justify-center border border-solid border-black-200 bg-black-50 font-[900] `}
    ${tw` hover:border-point-h-base hover:bg-point-base/40 `}
  }
`;
