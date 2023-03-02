import React, { useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { AppLayout, MyPageLayout } from '@/layouts';
import { useAddressesByUser } from '@/hooks/queries/address';
import { Heading2, Heading3 } from '@/components/Content';

export function MyPageAddress() {
  const [ cookies, ] = useCookies([ 'id', ]);
  const address = useAddressesByUser(cookies.id);
  const [ defaultAddress, ] = useMemo(() => {
    return address.filter((item) => item.status === 'true');
  }, [ address, ]);
  const otherAddress = useMemo(() => {
    return address.filter((item) => item.status === 'false');
  }, [ address, ]);

  console.log(address);
  console.log(defaultAddress);
  console.log(otherAddress);

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
            <div>주소</div>
          </div>

          <Heading3>주소록</Heading3>
          <div />
        </MyPageLayout>
      </AppLayout>
    </>
  );
}
