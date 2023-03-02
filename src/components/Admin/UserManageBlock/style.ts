import tw, { css } from 'twin.macro';

export const buttonBlockStyle = css`
  ${tw` flex gap-[20px] items-center justify-end `}

  & > button {
    ${tw` p-[10px] bg-point-base `}
    ${tw` hover:bg-point-h-base hover:text-white `}
  }
`;
