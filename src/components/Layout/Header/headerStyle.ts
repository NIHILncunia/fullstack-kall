import tw, { css } from 'twin.macro';

export const headerStyle = css`
  ${tw` border-b-[2px] border-b-black-base/10 border-solid `}
`;

export const headerTopStyle = css`
  ${tw` flex flex-row items-center text-[1.2rem] bg-point-h-base p-[20px] `}

  & > h1 {
    & img {
      ${tw` w-[100px] `}
    }
  }

  & > div {
    ${tw` text-right flex justify-end `}

    & > form {
      ${tw` flex flex-row w-[300px] border-[2px] border-white border-solid h-[40px] rounded-[25px] `}

      & > input {
        ${tw` flex-[1] rounded-l-[25px] placeholder:text-black-base/70 pl-[15px] `}
      }

      & > button {
        ${tw` w-[50px] flex justify-center items-center text-white rounded-r-[25px] `}
      }
    }
  }
`;

export const haederBottomStyle = css`
  ${tw` p-[20px] text-[1.2rem] `}

  & > ul {
    ${tw` flex flex-row gap-[20px] justify-end `}

    & a,
    & button {
      ${tw` text-point-link font-[600] `}
      ${tw` hover:text-point-h-link hover:underline `}
    }
  }
`;
