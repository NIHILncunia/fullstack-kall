import tw, { css } from 'twin.macro';

export const reviewCommentStyle = css`
  ${tw` p-[10px] border border-solid border-black-200 mb-[30px] flex flex-col gap-[10px] `}

  & > p {
    ${tw` text-center font-[900] `}
  }
`;

export const buttonStyle = css`
  ${tw` p-[10px] bg-point-base ml-[20px] `}
  ${tw` hover:( text-white bg-point-h-base ) `}
`;
