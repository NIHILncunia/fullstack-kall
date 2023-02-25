import React, {
  ChangeEvent, useCallback, useEffect, useState
} from 'react';
import { v4 as uuid } from 'uuid';
import { IProduct } from '@/types/tables.types';
import { ProductGrid } from '../ProductItem';
import { alignButtonStyle, tagControllerStyle } from './style';

interface ITagsProductsProps {
  data: IProduct[];
}

export function TagsProducts({ data, }: ITagsProductsProps) {
  const [ selectedTags, setSelectedTags, ] = useState<string[]>([]);
  const [ align, setAlign, ] = useState('');
  const [ products, setProducts, ] = useState<IProduct[]>([]);

  const allTags = Array.from(new Set(
    data.flatMap((item) => {
      return item.tag;
    })
  )).sort((a, b) => {
    const aNumber = Number(a.match(/\d+/));
    const bNumber = Number(b.match(/\d+/));

    if (!Number.isNaN(aNumber) && !Number.isNaN(bNumber)) {
      if (aNumber !== bNumber) {
        return aNumber - bNumber;
      }
    }

    return a.localeCompare(b);
  });

  useEffect(() => {
    const filteredData = data.filter((item) => {
      return selectedTags.length === 0 || selectedTags.some((tag) => item.tag.includes(tag));
    });

    let sortedData = filteredData;
    if (align === 'popular') {
      sortedData = [ ...filteredData, ]
        .sort((a, b) => b.cnt - a.cnt);
    } else if (align === 'rate') {
      sortedData = [ ...filteredData, ]
        .sort((a, b) => b.star - a.star);
    } else if (align === 'high-price') {
      sortedData = [ ...filteredData, ]
        .sort((a, b) => b.price - a.price);
    } else if (align === 'low-price') {
      sortedData = [ ...filteredData, ]
        .sort((a, b) => a.price - b.price);
    }

    setProducts(sortedData);
  }, [ data, selectedTags, align, ]);

  const onChangeTag = useCallback((tag: string) => {
    setSelectedTags((prev) => (
      prev.includes(tag)
        ? prev.filter((item) => item !== tag)
        : [ ...prev, tag, ]
    ));
  }, []);

  const onClickClean = useCallback(() => {
    setSelectedTags([]);
  }, []);

  const onChangeAlign = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value, } = event.target;
    setAlign(value);
  }, []);

  return (
    <>
      <div css={tagControllerStyle}>
        <p>아래의 태그들 중에서 원하는 태그들을 클릭하세요.</p>
        <div className='tags'>
          {allTags.map((item) => (
            <label key={uuid()} htmlFor={item}>
              <input
                type='checkbox'
                id={item}
                name='tags'
                value={item}
                checked={selectedTags.includes(item)}
                onChange={() => onChangeTag(item)}
                hidden
              />
              <span>#{item}</span>
            </label>
          ))}
        </div>
        <div className='button'>
          <button onClick={onClickClean}>선택 취소</button>
        </div>
      </div>
      <div css={alignButtonStyle}>
        <div>
          <label htmlFor='popular'>
            <input
              type='radio'
              id='popular'
              name='align'
              value='popular'
              checked={align === 'popular'}
              onChange={onChangeAlign}
              hidden
            />
            <span>인기순</span>
          </label>
          <label htmlFor='rate'>
            <input
              type='radio'
              id='rate'
              name='align'
              value='rate'
              checked={align === 'rate'}
              onChange={onChangeAlign}
              hidden
            />
            <span>평점순</span>
          </label>
          <label htmlFor='high-price'>
            <input
              type='radio'
              id='high-price'
              name='align'
              value='high-price'
              checked={align === 'high-price'}
              onChange={onChangeAlign}
              hidden
            />
            <span>높은 가격순</span>
          </label>
          <label htmlFor='low-price'>
            <input
              type='radio'
              id='low-price'
              name='align'
              value='low-price'
              checked={align === 'low-price'}
              onChange={onChangeAlign}
              hidden
            />
            <span>낮은 가격순</span>
          </label>
        </div>
      </div>
      <ProductGrid data={products} />
    </>
  );
}
