import tw, { css } from 'twin.macro';

export const signUpPageStyle = css`
  ${tw` py-[75px] `}
`;

export const formStyle = css`
  ${tw` text-[1.2rem] `}
`;

export const requiredInputStyle = css`
  ${tw` mb-[50px] `}
`;

export const legendStyle = css`
  ${tw` w-full block font-[900] text-[2rem] pb-[20px] mb-[20px] border-b-[1px] border-solid border-b-black-base `}
`;

export const inputsStyle = css`
  ${tw` flex flex-col gap-[10px] mb-[10px] `}

  & > label {
    ${tw` flex items-center `}

    & > span {
      ${tw` basis-[150px] shrink-0 `}
    }

    & > input {
      ${tw` w-full p-[10px] text-black-base bg-black-50 border border-solid border-black-100 `}
      ${tw` placeholder:text-black-base/70 `}
      ${tw` focus:bg-point-base/40 focus:border-point-base `}
    }

    & > button {
      ${tw` bg-red-500 `}
    }
  }
`;

export const addressInputStyle = css`
  ${tw` flex flex-col gap-[10px] `}

  & > div {
    & input {
      ${tw` w-[100px] mr-[10px] `}
    }

    & button {
      ${tw` bg-point-base p-[10px] cursor-pointer `}
      ${tw` hover:bg-point-h-base hover:text-white `}
    }
  }

  & div > input,
  & > input.address {
    ${tw` p-[10px] text-black-base bg-black-50 border border-solid border-black-100 `}
    ${tw` placeholder:text-black-base/70 `}
    ${tw` focus:bg-point-base/40 focus:border-point-base `}
  }

  & > input.address {
    ${tw` w-full `}
  }
`;

export const chooseInputStyle = css`
  ${tw` mb-[50px] `}
`;

export const birthdayStyle = css`
  ${tw` mb-[10px] flex items-center `}

  & > span {
    ${tw` basis-[150px] shrink-0 `}
  }

  & > input {
    ${tw` w-full p-[10px] text-black-base bg-black-50 border border-solid border-black-100 `}
    ${tw` placeholder:text-black-base/70 `}
    ${tw` focus:bg-point-base/40 focus:border-point-base `}
  }
`;

export const rootStyle = css`
  ${tw` flex items-center `}

  & > span {
    ${tw` basis-[150px] shrink-0 `}
  }

  & > div {
    ${tw` w-full flex items-center justify-between `}

    & input+span {
      ${tw` block bg-black-50 text-black-base p-[10px_20px] border border-black-100 border-solid cursor-pointer `}
    }

    & input:checked+span {
      ${tw` bg-point-base border border-point-base border-solid `}
    }
  }
`;

export const agreementStyle = css`
  & > div {
    ${tw` flex flex-col gap-[5px] mb-[50px] `}

    & input {
      ${tw` mr-[5px] `}
    }

    & span {
      ${tw` mr-[10px] text-black-base `}
    }

    & a {
      ${tw` text-point-link `}
      ${tw` hover:text-point-h-link hover:underline `}
    }
  }
`;

export const signUpButtonStyle = css`
  ${tw` bg-point-base p-[20px_10px] text-[1.2rem] w-full `}
  ${tw` hover:bg-point-h-base hover:text-white `}
`;
