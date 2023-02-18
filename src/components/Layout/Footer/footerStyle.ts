import tw, { css } from 'twin.macro';

export const footerStyle = css`
  ${tw` bg-black-base text-center text-white p-[20px] text-[1.2rem] `}
`;

export const footerLinksStyle = css`
  ${tw` mb-[10px] flex flex-row gap-[10px] justify-center `}

  & > a {
    ${tw` text-point-link `}
    ${tw` hover:text-point-h-link hover:underline `}
  }
`;

export const footerCopyStyle = css`
  ${tw` mt-[10px] `}
`;
