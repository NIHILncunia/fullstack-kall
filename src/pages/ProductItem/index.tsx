import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { FaHeart, FaShare } from 'react-icons/fa';
import tw, { css } from 'twin.macro';
import { AppLayout } from '@/layouts';
import { IProduct } from '@/types/tables.types';
import { useOtherProducts, useProductsById } from '@/hooks/queries/product';
import { IsLoding, Heading3, ItemRate } from '@/components/Content';
import {
  detailTopStyle, ProductItemPageStyle, sectionStyle, topImageStyle, topInfoStyle
} from './style';
import {
  CustomOption, DesignOption, ETCOption, OtherItems
} from '@/components/Content/ProductItem';
import { ISelect } from '@/types/product.select.types';

export function ProductItem() {
  const [ items, setItems, ] = useState<ISelect[]>([]);

  const param = useParams();
  const products = useOtherProducts(Number(param.id), param.category);

  const product = useProductsById(Number(param.id)) as IProduct;
  const otherProduct = useMemo(() => products, [ products, ]);

  const hiddenStyle = css`
    ${tw` absolute w-[1px] h-[1px] m-[1px] overflow-hidden `}
    clip-path: polygon(0 0, 0 0, 0 0);
  `;

  return (
    <>
      <AppLayout title={product.name}>
        <div id='ptoduct-item-page' css={ProductItemPageStyle}>
          <IsLoding />
          <div className='detail-top' css={detailTopStyle}>
            <div className='top-image' css={topImageStyle}>
              <img src={product.image} alt={product.name} />
            </div>
            <div className='top-info' css={topInfoStyle}>
              <div className='tags'>
                {product.tag?.map((item) => (
                  <Link key={uuid()} to={`/search/${item}`}>#{item}</Link>
                ))}
              </div>
              <div className='name'>
                <h2>{product.name}</h2>
                <div className='item-icons'>
                  <button aria-label='Add wishlist'><FaHeart /></button>
                  <button aria-label='Share this Product'><FaShare /></button>
                </div>
              </div>
              <div className='rate'>
                <ItemRate rate={product.star} />
              </div>
              <div className='prices'>
                <p className='item-price'>{product.price?.toLocaleString()}원</p>
                <p className='delivery-price'>배송비 <strong>3,000원 (주문 시 결제)</strong></p>
              </div>
              {/* 여기에 주문제작 옵션 */}
              {param.category === 'custom' && (
                <CustomOption
                  name={product.name}
                  price={product.price}
                  items={items}
                  setItems={setItems}
                />
              )}
              {/* 여기에 디자인 옵션 */}
              {param.category === 'design' && (
                <DesignOption
                  name={product.name}
                  price={product.price}
                  items={items}
                  setItems={setItems}
                />
              )}
              {/* 여기에 기타물품 옵션 */}
              {param.category === 'etc' && (
                <ETCOption
                  name={product.name}
                  price={product.price}
                  items={items}
                  setItems={setItems}
                />
              )}
              <div className='info-bottom'>
                <button>장바구니</button>
                <button>바로 구매</button>
              </div>
            </div>
          </div>

          <div className='other-items'>
            <Heading3>다른 상품 추천</Heading3>
            <OtherItems data={otherProduct} />
          </div>

          <div>
            <section id='detail' css={sectionStyle}>
              <h3 css={hiddenStyle}>상품 상세 정보</h3>
              <ul className='menu'>
                <li className='select'>
                  <a href='#detail'>상품 상세 정보</a>
                </li>
                <li>
                  <a href='#shipping-info'>배송/교환/환불 안내</a>
                </li>
                <li>
                  <a href='#review'>구매 후기</a>
                </li>
                <li>
                  <a href='#questions'>상품 문의</a>
                </li>
              </ul>

              <div className='content'>
                {/* 여기에 이미지들 들어감 */}
                <div css={tw`bg-red-300 h-[300px]`} />
                <div css={tw`bg-red-400 h-[300px]`} />
                <div css={tw`bg-red-300 h-[300px]`} />
                <div css={tw`bg-red-400 h-[300px]`} />
                <div css={tw`bg-red-300 h-[300px]`} />
              </div>
            </section>
            <section id='shipping-info' css={sectionStyle}>
              <h3 css={hiddenStyle}>배송/교환/환불 안내</h3>
              <ul className='menu'>
                <li>
                  <a href='#detail'>상품 상세 정보</a>
                </li>
                <li className='select'>
                  <a href='#shipping-info'>배송/교환/환불 안내</a>
                </li>
                <li>
                  <a href='#review'>구매 후기</a>
                </li>
                <li>
                  <a href='#questions'>상품 문의</a>
                </li>
              </ul>

              <div className='content'>
                <p className='info-message'>
                  《 배송안내 》<br />
                  - 배송비 : 기본 배송료는 3,500원입니다. (도서,산간,오지 일부지역은 배송이 불가합니다.) 40,000원 이상 구매시 무료배송입니다. <br />
                  - 택배배송은 주문시점, 배송지에 따라 상이합니다. (서울지역만 당일택배배송이 가능합니다.)
                </p>

                <p className='info-message'>
                  [서울 당일택배배송]<br />
                  월요일~금요일 배송 (토요일, 일요일 휴무)<br />
                  서울 당일택배배송의 경우 정확한 시간 지정은 어려우며, 우천시 다소 늦어질 수 있습니다.
                </p>

                <p className='info-message'>
                  [전국 우체국택배배송]<br />
                  화요일~금요일 배송 (일요일, 월요일 휴무)<br />
                  택배배송의 특성상 받는 시간대는 미리 알 수 없는 점 미리 말씀드립니다.
                </p>

                <p className='info-message'>
                  《 환불안내 》<br />
                  - 케이크는 식품 특성상 주문 요청에 의해 제작되기 때문에 단순 변심, 임의 반품에 의한 교환(재배송) 환불이 불가한 점 양해 부탁드립니다.<br />
                  - 고객님의 사정으로 인한 주소지 불충분 및 수취지연 시 발생되는 제품의 파손이나 변질에 대해 책임지지 않습니다.<br />
                  - 파손/ 변질된 제품 사진을 접수하지 않는 경우 교환(재배송) 환불이 불가합니다.<br />
                  - 배송된 상품의 신선도나 구성품 누락 시 라니케이크의 책임인 경우 새로운 구성으로 교환해드립니다. (문의 02-512-8189)
                </p>
              </div>
            </section>
            <section id='review' css={sectionStyle}>
              <h3 css={hiddenStyle}>구매 후기</h3>
              <ul className='menu'>
                <li>
                  <a href='#detail'>상품 상세 정보</a>
                </li>
                <li>
                  <a href='#shipping-info'>배송/교환/환불 안내</a>
                </li>
                <li className='select'>
                  <a href='#review'>구매 후기</a>
                </li>
                <li>
                  <a href='#questions'>상품 문의</a>
                </li>
              </ul>

              <div className='content'>
                상품 후기 목록
              </div>
            </section>
            <section id='questions' css={sectionStyle}>
              <h3 css={hiddenStyle}>상품 문의</h3>
              <ul className='menu'>
                <li>
                  <a href='#detail'>상품 상세 정보</a>
                </li>
                <li>
                  <a href='#shipping-info'>배송/교환/환불 안내</a>
                </li>
                <li>
                  <a href='#review'>구매 후기</a>
                </li>
                <li className='select'>
                  <a href='#questions'>상품 문의</a>
                </li>
              </ul>

              <div className='content'>
                상품 문의 목록
              </div>
            </section>
          </div>
        </div>
      </AppLayout>
    </>
  );
}