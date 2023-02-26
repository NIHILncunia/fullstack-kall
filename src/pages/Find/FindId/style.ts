import tw, { css, styled } from 'twin.macro';

export const findIdPageStyle = css`
  ${tw` py-[75px] `}
`;

export const messageStyle = css`
  ${tw` text-center text-[1.2rem] mb-[20px] `}
`;

export const buttonStyles = css`
  ${tw` flex flex-row gap-[10px] mb-[20px] text-[1.2rem] `}
`;

const BaseButton = styled.button`
  ${tw` p-[20px_10px] text-center cursor-pointer flex-[1] `}
`;

export const EmailButton = styled(BaseButton)<{findType: string}>`
  ${(props) => {
    return props.findType === 'email'
      ? tw`bg-point-h-base text-white`
      : tw`bg-point-base`;
  }};
`;

export const PhoneButton = styled(BaseButton)<{ findType: string }>`
  ${(props) => {
    return props.findType === 'phone'
      ? tw`bg-point-h-base text-white`
      : tw`bg-point-base`;
  }}
`;

export const findIdFormStyle = css`
  ${tw` flex flex-col gap-[10px] text-[1.2rem] `}

  & > label {
    ${tw` flex flex-row items-center `}

    & > span {
      ${tw` basis-[150px] shrink-0 `}
    }

    & > input {
      ${tw` w-full p-[10px] text-black-base bg-black-50 border border-solid border-black-100 `}
      ${tw` placeholder:text-black-base/70 `}
      ${tw` focus:bg-point-base/40 focus:border-point-base `}
    }
  }

  & > button {
    ${tw` mt-[10px] p-[20px_10px] bg-point-base text-black-base `}
    ${tw` hover:text-white hover:bg-point-h-base `}
  }
`;
