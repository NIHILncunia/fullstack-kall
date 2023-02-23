import tw, { css } from 'twin.macro';

export const agreePageStyle = css`
  ${tw` py-[50px] `}
`;

export const preStyle = css`
  ${tw` whitespace-pre-line font-nanum text-[1.2rem] w-full overflow-x-auto bg-black-50 text-black-base text-justify p-[20px] border border-solid border-black-100 `}

  & > h3 {
    ${tw` text-[1.4rem] mb-[10px] `}
  }

  & > p {
    ${tw` mb-[10px] nth-last-1:mb-0 `}
  }
`;
