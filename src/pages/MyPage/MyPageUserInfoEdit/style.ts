import tw, { css } from 'twin.macro';

export const withDrawalStyle = css`
  ${tw` mt-[30px] text-center font-[900] `}

  & > a {
    ${tw` text-point-link font-[900] `}
    ${tw` hover:underline hover:text-point-h-link `}
  }
`;
