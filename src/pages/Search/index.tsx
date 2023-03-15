import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import tw from 'twin.macro';
import { AppLayout } from '@/layouts';
import { kallInstance } from '@/data/axios.data';
import { IProduct } from '@/types/tables.types';
import { Heading2 } from '@/components/Content';
import { ProductGrid } from '@/components/Content/ProductItem';
import { useProducts } from '@/hooks/trueQuery/product';

interface QueryString {
  keyword?: string;
}

export function Search() {
  const [ products, setProducts, ] = useState<IProduct[]>([]);
  const [ tagedPtoducts, setTagedProdutcs, ] = useState<IProduct[]>([]);
  const location = useLocation();
  const { keyword, } = queryString.parse(location.search) as QueryString;

  const allProducts = useProducts();

  useEffect(() => {
    kallInstance.get<IProduct[]>(`/products?keyword=${keyword}`)
      .then((res) => {
        if (keyword) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    setTagedProdutcs((prev) => {
      return allProducts.filter((item) => {
        const tags = item.tag.split(',');
        return tags.includes(keyword);
      });
    });

    return () => {
      setTagedProdutcs([]);
    };
  }, [ keyword, allProducts, ]);

  console.log('검색된 상품 >> ', products);
  console.log('검색어', keyword);

  return (
    <>
      <AppLayout title={location.search}>
        <div id='search-page' css={tw`py-[50px] text-[1.2rem] text-black-base`}>
          <Heading2>
            {keyword ? (
              <>{`'${keyword}'`} 관련 상품 검색 결과 총 {products.length}건</>
            ) : (
              <>검색어 없음</>
            )}
          </Heading2>

          {products.length === 0 && (
            <div css={tw`py-[200px] text-[1.5rem] text-center`}>
              <p css={tw`font-[900]`}>
                {keyword !== '' ? (
                  <>검색된 결과가 없습니다. 다른 검색어를 입력해보세요.</>
                ) : (
                  <>검색어를 입력하세요.</>
                )}
              </p>
            </div>
          )}

          {products && (
            <div css={tw`mb-[100px]`}>
              <ProductGrid data={products} />
            </div>
          )}

          <Heading2>
            {keyword ? (
              <>{`'${keyword}'`} 태그 검색 결과 총 {tagedPtoducts.length}건</>
            ) : (
              <>검색어 없음</>
            )}
          </Heading2>

          {tagedPtoducts.length === 0 && (
            <div css={tw`py-[200px] text-[1.5rem] text-center`}>
              <p css={tw`font-[900]`}>
                {keyword !== '' ? (
                  <>검색된 결과가 없습니다. 다른 검색어를 입력해보세요.</>
                ) : (
                  <>검색어를 입력하세요.</>
                )}
              </p>
            </div>
          )}

          {tagedPtoducts && (
            <div>
              <ProductGrid data={tagedPtoducts} />
            </div>
          )}
        </div>
      </AppLayout>
    </>
  );
}
