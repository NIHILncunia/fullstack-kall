import tw, { css } from 'twin.macro';

export const otherItemStyle = css`
  ${tw` flex gap-[20px] text-[1.2rem] mb-[50px] `}

  & > div {
    ${tw` flex-[1] text-center p-[10px] flex flex-col gap-[10px] border-[2px] border-solid border-black-base/10 `}
    ${tw` hover:border-point-h-base `}

    & > div.item-image {
      ${tw` bg-black-base text-white `}

      & img {
        ${tw` block h-[180px] leading-[180px] `}
      }
    }

    & > div.item-info {
      & > h4.item-name {
        & a {
          ${tw` text-point-link `}
          ${tw` hover:text-point-h-link hover:underline `}

          & > strong {
            ${tw` font-[700] `}
          }
        }
      }

      & > p.item-price {
        ${tw` mb-[10px] `}
      }
    }
  }
`;
