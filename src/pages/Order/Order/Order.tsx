import React, {
  ChangeEvent,
  useCallback, useEffect, useRef, useState
} from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import tw from 'twin.macro';
import useDaumPostcodePopup from 'react-daum-postcode/lib/useDaumPostcodePopup';
import { AppLayout } from '@/layouts';
import { Heading2, Heading3 } from '@/components/Content';
import {
  fromInfoStyle, itemListStyle, orderPageStyle, orderProgressStyle, payInfoStyle, paymentStyle, toInfoButtonStyle, toInfoStyle
} from './style';
import { useInput } from '@/hooks';
import { IOrderDetail } from '@/types/tables.types';
import { OrderDetailList } from '@/components/Content/OrderDetail';
import { cardData } from '@/data/select.data';
import { useUserById } from '@/hooks/trueQuery/users';
import { useAddressesByUser } from '@/hooks/trueQuery/address';

export function Order() {
  const [ isDisable, setIsDisable, ] = useState(false);
  const [ orderDetails, setOrderDetails, ] = useState<IOrderDetail[]>([]);
  const [ message, setMessage, ] = useState(
    '주문을 하려면 아래의 결제 버튼을 클릭해주세요.'
  );
  const [ payType, setPayType, ] = useState('card');
  const [ card, setCard, ] = useState('');
  const [ isPay, setIsPay, ] = useState(false);
  const [ buttonValue, setButtonValue, ] = useState('결제 정보 입력');

  const [ cookies, ] = useCookies([ 'id', ]);
  const navigate = useNavigate();
  const open = useDaumPostcodePopup();

  useEffect(() => {
    const cartToOrder = localStorage.getItem('cartToOrder');
    setOrderDetails(JSON.parse(cartToOrder));
  }, []);

  const userData = useUserById(cookies.id);
  const [ addressData, ] = useAddressesByUser(cookies.id);

  const nameRef = useRef<HTMLInputElement>();
  const zipCodeRef = useRef<HTMLInputElement>();
  const address1Ref = useRef<HTMLInputElement>();
  const address2Ref = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const reqRef = useRef<HTMLInputElement>();
  const mileageRef = useRef<HTMLInputElement>();

  const name = useInput(nameRef, 'name');
  const zipCode = useInput(zipCodeRef, 'zipCode');
  const address1 = useInput(address1Ref, 'address1');
  const address2 = useInput(address2Ref, 'address2');
  const phone = useInput(phoneRef, 'phone');
  const req = useInput(reqRef, 'req');
  const mileage = useInput(mileageRef, 'mileage');

  const onClickOpen = useCallback(() => {
    open({
      onComplete: (data) => {
        const fullAddress = `${data.address} (${data.buildingName})`;

        zipCode.setValue(data.zonecode);
        address1.setValue(fullAddress);
      },
    });
  }, [ open, ]);

  const onClickButton = useCallback(() => {
    name.setValue(userData.name);
    zipCode.setValue(addressData.zip_code);
    address1.setValue(addressData.address_1);
    address2.setValue(addressData.address_2);
    phone.setValue(userData.phone_nb);
    setIsDisable(true);
  }, [ name, zipCode, address1, address2, phone, ]);

  const totalItemPrice = orderDetails
    .map((item) => item.price * item.amount)
    .reduce((pre, crr) => pre + crr, 0);

  const deliveryPrice = 3000;

  const totalPrice = (totalItemPrice + deliveryPrice) - Number(mileage.data.value);

  const onClickPayment = useCallback(() => {
    if (!isPay) {
      console.log('결제 정보를 입력합니다.');
      setMessage('결제 정보를 입력해주세요.');
      setIsPay(true);
      setButtonValue('결제하기');
    } else {
      console.log('결제를 진행합니다.');

      /**
       * 프론트에서는 결제가 완료되면 주문 데이터를 넘겨준다. 그러면 백엔드에서는 주문 레코드가 생성되고 그 레코드의 식별값을 프론트로 보내준다.
       * 백엔드로부터 받은 식별값을 이용해 order_detail 테이블에 데이터를 추가하기 위해
       * 백엔드로 주문한 상품의 정보들을 넘겨준다.
       * 문제 없이 위의 과정이 종료되면 주문이 끝나게 된다. 주문 완료 페이지로 넘어가게 된다.
       */

      const newOrder = {
        user_id: userData.id,
        name: userData.name,
        zip_code: addressData.zip_code,
        address_1: addressData.address_1,
        address_2: addressData.address_2,
        phone_nb: userData.phone_nb,
        request: req.data.value,
        date: new Date(),
        mileage: Number(mileage.data.value),
        price: totalPrice,
        payment: payType,
      };

      console.log('주문 테이블 레코드 생성 >> ', newOrder);
      localStorage.setItem('orderData', JSON.stringify(newOrder));
      navigate('/order/complete');
    }
  }, [ isPay, orderDetails, payType, ]);

  console.log('payType >> ', payType);

  const onChangePayType = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setPayType(event.target.value);
  }, []);

  const onChangeCard = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setCard(event.target.value);
  }, []);

  const onClickCancel = useCallback(() => {
    navigate('/cart');
  }, []);

  return (
    <>
      <AppLayout title='주문 및 결제'>AppLayout
        <div id='order-page' css={orderPageStyle}>
          <Heading2>주문 / 결제</Heading2>
          <div className='order-progress' css={orderProgressStyle}>
            <p>01 장바구니</p>
            <p className='selected'>02 주문 / 결제</p>
            <p>03 주문완료</p>
          </div>
          <Heading3>구매자 정보</Heading3>
          <div className='from-info' css={fromInfoStyle}>
            <div>
              <p>이름</p>
              <p>{userData?.name}</p>
            </div>
            <div>
              <p>배송지</p>
              <p>{addressData?.address_1}</p>
            </div>
            <div>
              <p>휴대폰 번호</p>
              <p>{userData?.phone_nb}</p>
            </div>
          </div>
          <Heading3>
            받는사람 정보
            <button onClick={onClickButton} css={toInfoButtonStyle}>
              구매자와 동일
            </button>
          </Heading3>
          <div className='to-info' css={toInfoStyle}>
            <div>
              <p>이름</p>
              <input
                type='text'
                placeholder='받으실 분의 이름을 입력하세요.'
                readOnly={isDisable}
                ref={nameRef}
                {...name.data}
              />
            </div>
            <div>
              <p>배송지</p>
              <div className='address-block'>
                <div>
                  <input className='zip-code' type='text' ref={zipCodeRef} {...zipCode.data} />
                  <button type='button' onClick={onClickOpen}>우편번호 찾기</button>
                </div>
                <div>
                  <input className='address1' type='text' ref={address1Ref} {...address1.data} />
                  <input className='address2' type='text' ref={address2Ref} {...address2.data} />
                </div>
              </div>
            </div>
            <div>
              <p>연락처</p>
              <input
                type='text'
                placeholder={`'-' 없이 입력하세요.`}
                readOnly={isDisable}
                ref={phoneRef}
                {...phone.data}
              />
            </div>
            <div>
              <p>배송 요청사항</p>
              <input
                type='text'
                placeholder='요청사항을 입력하세요.'
                ref={reqRef}
                {...req.data}
              />
            </div>
          </div>
          <Heading3>결제 상품 목록</Heading3>
          <div className='item-list' css={itemListStyle}>
            <div className='list-header'>
              <p>상품 / 옵션</p>
              <p>가격</p>
            </div>
            {orderDetails.map((item) => (
              <OrderDetailList key={item.id} item={item} />
            ))}
          </div>
          <Heading3>결제 정보</Heading3>
          <div className='pay-info' css={payInfoStyle}>
            <div className='info-line'>
              <p>총 상품가격</p>
              <p>{totalItemPrice.toLocaleString()}원</p>
            </div>
            <div className='info-line'>
              <p>배송비</p>
              <p>{deliveryPrice.toLocaleString()}원</p>
            </div>
            <div className='info-line'>
              <p>마일리지</p>
              <input
                type='text'
                placeholder='사용하실 포인트를 입력하세요.'
                ref={mileageRef}
                {...mileage.data}
              />
            </div>
            <span>사용 가능 마일리지: {userData.mileage?.toLocaleString()}포인트</span>
            <div className='info-line'>
              <p>총 결제 금액</p>
              <p>{totalPrice.toLocaleString()}원</p>
            </div>
            <div className='info-line'>
              <p>결제 수단</p>
              <select value={payType} onChange={onChangePayType}>
                <option value='card'>신용카드</option>
              </select>
            </div>
            <div className='info-message'>
              <p>다른 결제 수단은 추후 추가될 예정입니다.</p>
            </div>
          </div>
          <div className='payment' css={paymentStyle}>
            <div className='message-button'>
              <p>{message}</p>
              <button type='button' onClick={onClickPayment} css={tw`mr-[20px]`}>
                {buttonValue}
              </button>
              <button type='button' onClick={onClickCancel}>취소</button>
            </div>
            {isPay && (
              <form>
                <label htmlFor='card-select'>
                  <span>카드 선택</span>
                  <select
                    id='card-select'
                    value={card}
                    onChange={onChangeCard}
                  >
                    {cardData.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label htmlFor='card-number'>
                  <span>카드번호</span>
                  <input type='text' id='card-number' />
                </label>
                <label htmlFor='period'>
                  <span>유효기간</span>
                  <input type='text' id='period' placeholder='ex) MM/YY' />
                </label>
                <label htmlFor='cvc'>
                  <span>CVC</span>
                  <input type='password' id='cvc' placeholder='ex) 3자리 숫자' />
                </label>
              </form>
            )}
          </div>
        </div>
      </AppLayout>
    </>
  );
}
