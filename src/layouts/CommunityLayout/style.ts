import tw, { css } from 'twin.macro';

export const guidePageStyle = css`
  ${tw` py-[50px] text-black-base text-[1.2rem] `}
`;

export const menuStyle = css`
  ${tw` mb-[30px] `}

  & > ul {
    ${tw` flex gap-[2px] items-center `}
  }
`;

export const contentStyle = css`
  ${tw`  `}
`;
