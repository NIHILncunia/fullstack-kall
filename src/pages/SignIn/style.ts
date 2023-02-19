import tw, { css } from 'twin.macro';

export const signInPageStyle = css`
  ${tw` text-[1.2rem] mt-[75px] `}
`;

export const inputsStyle = css`
  ${tw` flex flex-col gap-[10px] mb-[10px] `}

  & > input {
    ${tw` w-full p-[10px] text-black-base bg-black-50 `}
    ${tw` placeholder:text-black-base/70 `}
    ${tw` focus:border-solid focus:border-b-[2px] focus:border-b-point-h-base `}
  }
`;

export const checksStyle = css`
  ${tw` mb-[10px] flex flex-row gap-[15px] text-black-base `}
`;

export const buttonStyle = css`
  ${tw` block w-full p-[20px_10px] mb-[10px] bg-point-base text-black-base cursor-pointer
  text-[1.2rem] `}
  ${tw` hover:bg-point-h-base hover:text-white `}
`;

export const signInLinkStyle = css`
  ${tw` flex flex-row justify-around mb-[50px] `}

  & a {
    ${tw` text-point-link `}
    ${tw` hover:text-point-h-link hover:underline `}
  }
`;

export const kakaoSigninStyle = css`
  ${tw` mb-[30px] `}
`;

export const signinQuestionStyle = css`
  ${tw` mb-[75px] text-center `}

  & a {
    ${tw` text-point-link text-[1.5rem] `}
    ${tw` hover:text-point-h-link hover:underline `}
  }
`;
