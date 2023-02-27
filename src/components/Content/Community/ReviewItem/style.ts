import tw, { css } from 'twin.macro';

export const reviewItem = css`
  ${tw` border-[2px] border-solid border-black-base/10 p-[10px] flex gap-[10px] `}
  ${tw` hover:border-point-h-base `}

  & > img {
    ${tw` w-[150px] h-[150px] bg-black-base text-white `}
  }

  & > div {
    ${tw` flex-[1] flex flex-col justify-between `}

    & > div {
      & > h3 {
        ${tw` mb-[5px] `}

        & > a {
          ${tw` text-[1.5rem] font-[900] text-point-link `}
          ${tw` hover:text-point-h-link hover:underline `}
        }
      }
    }
  }
`;
