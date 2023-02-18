import tw, { css } from 'twin.macro';

export const autoCarouselStyle = css`
  ${tw` relative `}
`;

export const carouselStyle = css`
  ${tw` mb-[50px] w-full overflow-hidden `}
`;

export const carouselImgListStyle = css`
  ${tw` whitespace-nowrap `}
  transition: ease 1s;
`;

export const carouselItemStyle = css`
  ${tw` w-full inline-block `}

  & img {
    ${tw` w-full block `}
  }
`;

const slideButtonStyle = css`
  ${tw` absolute rounded-[50%] w-[70px] h-[70px] leading-[70px] flex items-center justify-center text-[2rem] cursor-pointer z-[2] `}
  top: calc((100% - 70px) / 2);
`;

export const slideButtonStylePrev = css`
  ${slideButtonStyle}
  ${tw` left-[-35px] `}
`;

export const slideButtonStyleNext = css`
  ${slideButtonStyle}
  ${tw` right-[-35px] `}
`;

export const carouselIndicatorStyle = css`
  ${tw` mt-[10px] flex flex-row items-center justify-center gap-[5px] `}

  & button {
    ${tw` w-[30px] h-[30px] bg-point-h-base opacity-[.3] cursor-pointer rounded-[50%] `}

    &.active {
      ${tw` opacity-[1] `}
    }
  }
`;
