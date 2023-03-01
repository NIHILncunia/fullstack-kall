import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { topButtonStyle } from './style';

export function GoToTop() {
  return (
    <>
      <div css={topButtonStyle}>
        <FaArrowUp />
      </div>
    </>
  );
}
