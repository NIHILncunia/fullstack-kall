import tw, { css } from 'twin.macro';

export const buttonStyle = css`
  ${tw` bg-point-base p-[10px] border border-solid border-point-base w-[100px] `}
  ${tw` hover:border-point-h-base hover:text-white hover:bg-point-h-base `}

  &:disabled {
    ${tw` bg-black-100 border-black-100 text-black-base/40 `}
  }
`;
