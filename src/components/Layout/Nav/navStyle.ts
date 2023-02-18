import tw, { css } from 'twin.macro';

export const navStyle = css`
  ${tw` flex-[1] `}

  & > ul {
    ${tw` flex flex-row items-center justify-center gap-[30px] `}

    & a {
      ${tw` w-[150px] block text-center border-dotted border-b-[5px] border-b-white text-white p-[10px] font-[600] `}
      ${tw` hover:border-solid `}
    }
  }
`;
