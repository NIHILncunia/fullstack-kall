import React, { useCallback, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { AppLayout, MyPageLayout } from '@/layouts';
import { useAddressesByUser } from '@/hooks/queries/address';
import { Heading2, Heading3 } from '@/components/Content';

export function MyPageAddress() {
  const [ selectedAddress, setSelectedAddress, ] = useState<number>(null);

  const [ cookies, ] = useCookies([ 'id', ]);
  const address = useAddressesByUser(cookies.id);
  const [ defaultAddress, ] = useMemo(() => {
    return address.filter((item) => item.status === 'true');
  }, [ address, ]);
  const otherAddress = useMemo(() => {
    return address.filter((item) => item.status === 'false');
  }, [ address, ]);

  const onChnageAddress = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress(Number(event.target.value));
  }, []);

  console.log('선택된 주소 >> ', selectedAddress);

  return (
    <>
      <AppLayout title='주소 관리'>
        <MyPageLayout pageId='mypage-address-page'>
          <Heading2>주소 관리</Heading2>

          <Heading3>기본 배송지</Heading3>
          <div>
            <div>
              <p>이름</p>
              <p>주소</p>
            </div>
            <div>
              <p>{defaultAddress?.address_name}</p>
              <p>{defaultAddress?.zip_code} - {defaultAddress?.address_1} {defaultAddress?.address_2}</p>
            </div>
          </div>

          <Heading3>주소 목록</Heading3>
          <div>
            <div>
              <p>선택</p>
              <p>이름</p>
              <p>주소</p>
            </div>
            {otherAddress?.map((item) => (
              <div key={item.id}>
                <p>
                  <input
                    type='radio'
                    name='address'
                    value={item.id}
                    onChange={onChnageAddress}
                    checked={selectedAddress === item.id}
                  />
                </p>
                <p>{item.address_name}</p>
                <p>{item.zip_code} - {item.address_1} {item.address_2}</p>
              </div>
            ))}
          </div>
        </MyPageLayout>
      </AppLayout>
    </>
  );
}
