import React, { useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import tw from 'twin.macro';
import { AppLayout, MyPageLayout } from '@/layouts';
import { Heading2, Heading3 } from '@/components/Content';
import { addressButtonStyle, addressListStyle, defaultAddressStyle } from './style';
import { useAddressesByUser, useUpdateDefaultAddress } from '@/hooks/trueQuery/address';
import { AddressForm, AddressListItem } from '@/components/Content/MyPage';

export function MyPageAddress() {
  const [ selectedAddress, setSelectedAddress, ] = useState<number>(null);

  const [ cookies, ] = useCookies([ 'id', ]);
  const address = useAddressesByUser(cookies.id);
  const { mutate, } = useUpdateDefaultAddress(cookies.id);
  const [ defaultAddress, ] = address
    .filter((item) => item.status === 'true');
  const otherAddress = address
    .filter((item) => item.status === 'false');

  const onClickDefault = useCallback(() => {
    if (selectedAddress === null) {
      return;
    }

    const [ selectedItem, ] = otherAddress.filter(
      (item) => (item.usAddressId === selectedAddress)
    );

    selectedItem.status = 'true';
    mutate(selectedItem);

    setSelectedAddress(null);
  }, [ selectedAddress, otherAddress, ]);

  return (
    <>
      <AppLayout title='주소 관리'>
        <MyPageLayout pageId='mypage-address-page'>
          <Heading2>주소 관리</Heading2>

          <Heading3>새 주소 입력</Heading3>
          <AddressForm />

          <Heading3>기본 배송지</Heading3>
          <div css={defaultAddressStyle}>
            <div className='list-header'>
              <p>이름</p>
              <p>주소</p>
            </div>
            {!defaultAddress && (
              <div className='list-none'>
                <p>기본 배송지가 없습니다. 기본 배송지를 설정해주세요.</p>
              </div>
            )}
            {defaultAddress && (
              <div className='list-content'>
                <p>{defaultAddress?.addressName}</p>
                <p>{defaultAddress?.zip_code} - {defaultAddress?.address_1} {defaultAddress?.address_2}</p>
              </div>
            )}
          </div>

          <Heading3>주소 목록</Heading3>
          <div css={addressListStyle}>
            <div className='list-header'>
              <p>선택</p>
              <p>이름</p>
              <p>주소</p>
            </div>
            {otherAddress.length === 0 && (
              <div className='list-none'>
                <p>등록된 주소가 없습니다. 주소를 등록해주세요!</p>
              </div>
            )}
            {otherAddress?.map((item) => (
              <AddressListItem
                key={item.usAddressId}
                item={item}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
            ))}
          </div>
          <p css={tw`font-[900] mt-[20px] text-blue-500 mb-[30px] text-center`}>
            원하는 주소를 선택하고 아래의 버튼을 클릭하세요.
          </p>
          <button css={addressButtonStyle} onClick={onClickDefault}>기본 배송지로</button>
        </MyPageLayout>
      </AppLayout>
    </>
  );
}
