import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { slideImages } from '@/data/slideImages.data';
import {
  autoCarouselStyle, carouselImgListStyle, carouselIndicatorStyle, carouselItemStyle, carouselStyle, slideButtonStyleNext, slideButtonStylePrev
} from './mainSlideBlock';

export function SlideBlock() {
  const [ currentIndex, setCurrentIndex, ] = useState(0);
  const [ isPaused, setIsPaused, ] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((currentIndex + 1) % slideImages.length);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [ currentIndex, isPaused, ]);

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + slideImages.length) % slideImages.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % slideImages.length);
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div css={autoCarouselStyle}>
      <div
        css={carouselStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          css={carouselImgListStyle}
          style={{ transform: `translateX(-${currentIndex * 100}%)`, }}
        >
          {slideImages.map((item) => (
            <div key={uuid()} css={carouselItemStyle}>
              <img src={item.src} alt={item.label} />
            </div>
          ))}
        </div>
        <div css={carouselIndicatorStyle}>
          {slideImages.map((_, index) => (
            <button
              key={uuid()}
              type='button'
              className={index === currentIndex ? 'active' : ''}
              aria-label='slide-button'
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </div>
        <button
          css={slideButtonStylePrev}
          className='prev'
          onClick={handlePrevClick}
        >
          <FaArrowLeft />
        </button>
        <button
          css={slideButtonStyleNext}
          className='next'
          onClick={handleNextClick}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
