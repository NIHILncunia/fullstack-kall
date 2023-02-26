import tw, { css, styled } from 'twin.macro';

export const findPasswordPageStyle = css`
  ${tw` py-[75px] `}
`;

export const Message = styled.p<{ error: boolean }>`
  ${tw` text-[1.2rem] text-center mb-[20px] `}
  ${(props) => (
    props.error
      ? tw`text-red-500`
      : tw`text-black-base`
  )}
`;

export const formStyle = css`
  ${tw` flex flex-col gap-[10px] text-[1.2rem] mb-[50px] `}

  & > input {
    ${tw` bg-black-50 p-[10px] text-black-base border border-solid border-black-100 `}
    ${tw` placeholder:text-black-base/70 `}
    ${tw` focus:bg-point-base/40 focus:border-point-base `}
  }

  & > button {
    ${tw` p-[20px_10px] bg-point-base text-black-base `}
    ${tw` hover:text-white hover:bg-point-h-base `}
  }
`;

export const pStyle = css`
  ${tw` text-justify text-[1.2rem] `}

  & > a {
    ${tw` text-point-link `}
    ${tw` hover:underline hover:text-point-h-link `}
  }
`;
