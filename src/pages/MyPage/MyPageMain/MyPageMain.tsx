import React, { useMemo } from 'react';
import { useCookies } from 'react-cookie';
import {
  FaBarcode,
  FaBoxOpen,
  FaCheck,
  FaClipboardCheck, FaClipboardList, FaCoins, FaHome, FaRegHeart, FaShoppingCart, FaTruckMoving
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AppLayout, MyPageLayout } from '@/layouts';
import { useUser } from '@/hooks/queries/user';
import { useAddressesByUser } from '@/hooks/queries/address';
import { Heading2, Heading3, IsLoding } from '@/components/Content';
import { useOrders } from '@/hooks/queries/order';
import { defaultInfoStyle, mypageIconLinkStyle, orderStatStyle } from './style';

export function MyPageMain() {
  const [ cookies, ] = useCookies([ 'id', 'role', ]);
  const user = useUser(cookies.id);
  const [ address, ] = useAddressesByUser(user?.id)
    .filter((item) => item.status === 'true');
  const orders = useOrders();

  const beforePay = useMemo(() => {
    return orders.filter((item) => item.order_status === '결제 대기중');
  }, [ orders, ]);

  const prepareingDelivery = useMemo(() => {
    return orders.filter((item) => item.order_status === '배송 준비중');
  }, [ orders, ]);

  const onDelivery = useMemo(() => {
    return orders.filter((item) => item.order_status === '배송중');
  }, [ orders, ]);

  const deliveryComplete = useMemo(() => {
    return orders.filter((item) => item.order_status === '배송 완료');
  }, [ orders, ]);

  return (
    <>
      <AppLayout title='마이페이지'>
        <MyPageLayout pageId='mypage-main-page'>
          <IsLoding />
          <Heading2>마이 페이지</Heading2>

          <Heading3>기본 프로필</Heading3>
          <div className='default-info' css={defaultInfoStyle}>
            <p>
              <span>아이디</span>
              <span>{user.id}</span>
            </p>
            <p>
              <span>이름</span>
              <span>{user.name}</span>
            </p>
            <p>
              <span>이메일</span>
              <span>{user.email}</span>
            </p>
            <p>
              <span>휴대폰</span>
              <span>{user.phone_nb}</span>
            </p>
            <p>
              <span>기본 배송지</span>
              <span>{address?.address_name} - {address?.address_1} {address?.address_2}</span>
            </p>
          </div>

          <Heading3>주문처리현황</Heading3>
          <div className='order-stat' css={orderStatStyle}>
            <div>
              <Link to=''>
                <FaBarcode size={150} />
                <span>결제 대기중 {beforePay.length}건</span>
              </Link>
            </div>
            <div>
              <Link to=''>
                <FaBoxOpen size={150} />
                <span>배송 준비중 {prepareingDelivery.length}건</span>
              </Link>
            </div>
            <div>
              <Link to=''>
                <FaTruckMoving size={150} />
                <span>배송중 {onDelivery.length}건</span>
              </Link>
            </div>
            <div>
              <Link to=''>
                <FaCheck size={150} />
                <span>배송 완료 {deliveryComplete.length}건</span>
              </Link>
            </div>
          </div>

          <Heading3>바로가기</Heading3>
          <div className='mypage-icon-link' css={mypageIconLinkStyle}>
            <div>
              <div>
                <Link to='/mypage/order'>
                  <FaClipboardCheck size={150} />
                  <span>주문 관리</span>
                </Link>
              </div>
              <div>
                <Link to='/mypage/wishlist'>
                  <FaRegHeart size={150} />
                  <span>찜목록</span>
                </Link>
              </div>
              <div>
                <Link to='/mypage/address'>
                  <FaHome size={150} />
                  <span>주소 관리</span>
                </Link>
              </div>
              <div>
                <Link to='/cart'>
                  <FaShoppingCart size={150} />
                  <span>장바구니</span>
                </Link>
              </div>
            </div>
            <div>
              <div>
                <Link to='/mypage/mileage'>
                  <FaCoins size={150} />
                  <span>마일리지</span>
                </Link>
              </div>
              <div>
                <Link to='/mypage/review'>
                  <FaClipboardList size={150} />
                  <span>리뷰 목록</span>
                </Link>
              </div>
              <div>
                <Link to='/mypage/question'>
                  <FaClipboardList size={150} />
                  <span>문의 목록</span>
                </Link>
              </div>
            </div>
          </div>
        </MyPageLayout>
      </AppLayout>
    </>
  );
}
