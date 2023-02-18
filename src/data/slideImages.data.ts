import slide1 from '@/images/slideImages/main_pic1.jpg';
import slide2 from '@/images/slideImages/main_pic2.jpg';
import slide3 from '@/images/slideImages/main_pic3.jpg';

interface ISlides {
  src: string;
  label: string;
}

export const slideImages: ISlides[] = [
  {
    src: slide1,
    label: '슬라이드 이미지 1',
  },
  {
    src: slide2,
    label: '슬라이드 이미지 2',
  },
  {
    src: slide3,
    label: '슬라이드 이미지 3',
  },
];
