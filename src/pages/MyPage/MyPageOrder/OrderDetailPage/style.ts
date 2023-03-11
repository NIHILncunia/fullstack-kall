import tw, { css } from 'twin.macro';

export const buttonControllsStyle = css`
  ${tw` text-left mb-[30px] `}

  & > a {
    ${tw` p-[10px] block border border-black-200 bg-black-50 w-[200px] text-center `}
    ${tw` hover:( border-point-h-base text-white bg-point-h-base ) `}
  }
`;

export const orderDetailInfoTableStyle = css`
  ${tw` grid grid-cols-[150px_1fr] gap-[2px] `}

  & > div {
    ${tw` p-[10px] border `}
  }

  & > div.table-header {
    ${tw` font-[900] border-point-h-base bg-point-h-base `}
  }

  & > div.table-content {
    ${tw` bg-black-50 border-black-200 `}
  }
`;

export const orderDetailItemsStyle = css`
  ${tw` mt-[30px] flex flex-col gap-[10px] `}

  & > div:not(div.refund-input) {
    ${tw` flex items-stretch p-[10px] border border-black-200 bg-black-50 gap-[20px] `}

    & > img {
      ${tw` block w-[200px] h-[200px] bg-black-base shrink-0 `}
    }

    & > div {
      ${tw` text-[1.5rem] flex flex-col gap-[10px] w-full `}

      & > p {
        ${tw` nth-2:( flex-[1] ) `}
        ${tw` nth-3:( justify-start ) `}
      }

      & > div {
        ${tw` text-right `}

        & > button {
          ${tw` p-[10px] border border-point-h-base bg-point-base/40 w-[200px] text-center `}
          ${tw` hover:( bg-point-h-base text-white ) `}
        }
      }
    }
  }
`;

export const refundInputStyle = css`
  ${tw` mb-[30px] flex flex-col gap-[2px] p-[10px] border border-black-200 bg-black-50 `}
  ${tw` last:mb-0 `}

  & > label {
    ${tw` flex items-stretch gap-[2px] `}

    & > span {
      ${tw` shrink-0 p-[10px] w-[150px] border border-point-h-base bg-point-h-base flex items-center font-[900] `}
    }

    & > input {
      ${tw` p-[10px] border border-black-200 bg-white w-full `}
      ${tw` focus:( bg-point-base/40 border-point-h-base ) `}
    }

    & > textarea {
      ${tw` p-[10px] border border-black-200 bg-white w-full h-[150px] resize-none outline-none `}
      ${tw` focus:( bg-point-base/40 border-point-h-base ) `}
    }
  }

  & > div {
    ${tw` flex gap-[10px] mt-[10px] `}

    & > input {
      ${tw` p-[10px] border border-black-200 bg-white w-full `}
    }

    & > button {
      ${tw` shrink-0 w-[200px] border border-point-h-base bg-point-base p-[10px] `}
      ${tw` hover:( border-point-h-base bg-point-h-base text-white ) `}
    }
  }
`;
