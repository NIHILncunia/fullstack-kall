import tw, { css } from 'twin.macro';

export const mypageLayoutStyle = css`
  ${tw` py-[50px] flex gap-[50px] text-black-base text-[1.2rem] relative `}
`;

export const menuStyle = css`
  ${tw` shrink-0 w-[150px] `}

  & > div {
    & > p {
      ${tw` text-[1.5rem] font-[900] cursor-pointer `}

      &.dash {
        ${tw` hover:underline `}
      }

      &.current {
        ${tw` text-point-link `}
      }
    }

    & > div {
      ${tw` mb-[10px] `}
    }
  }
`;

export const contentStyle = css`
  ${tw` flex-[1] `}
`;
