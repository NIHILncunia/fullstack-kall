import React, { useCallback, useRef } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useCookies } from 'react-cookie';
import { useInput } from '@/hooks';
import { addressFormStyle } from './style';
import { IAddress } from '@/types/tables.types';
import { useUserById } from '@/hooks/trueQuery/users';
import { useCreateAddress } from '@/hooks/trueQuery/address';

export function AddressForm() {
  const [ cookies, ] = useCookies([ 'id', ]);
  const user = useUserById(cookies.id);

  const { mutate: createAddress, } = useCreateAddress(cookies.id);

  const zipCodeRef = useRef<HTMLInputElement>();
  const address1Ref = useRef<HTMLInputElement>();
  const address2Ref = useRef<HTMLInputElement>();
  const addressNameRef = useRef<HTMLInputElement>();

  const zipCode = useInput(zipCodeRef, 'zipCode');
  const address1 = useInput(address1Ref, 'address1');
  const address2 = useInput(address2Ref, 'address2');
  const addressName = useInput(addressNameRef, 'addressName');

  const open = useDaumPostcodePopup();

  const onClickButton = useCallback(() => {
    open({
      onComplete(data) {
        const fullAddress = `${data.address} (${data.buildingName})`;

        zipCode.setValue(data.zonecode);
        address1.setValue(fullAddress);
      },
    });
  }, [ open, ]);

  const onSubmitForm = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newAddress: IAddress;
    console.log('user >> ', user);

    if ('userId' in user) {
      newAddress = {
        userDTO: user,
        name: user.name,
        addressName: addressName.data.value,
        phone_nb: user.phoneNb,
        zip_code: zipCode.data.value,
        address_1: address1.data.value,
        address_2: address2.data.value,
      };
    }

    console.log('주소 등록 데이터 >> ', newAddress);
    createAddress(newAddress);
  }, [ user, addressName, zipCode, address1, address2, ]);
  return (
    <>
      <form css={addressFormStyle} onSubmit={onSubmitForm}>
        <div>
          <input type='text' required placeholder='주소 이름' ref={addressNameRef} {...addressName.data} />
        </div>
        <div>
          <input type='text' required readOnly placeholder='우편번호' ref={zipCodeRef} {...zipCode.data} />
          <button type='button' onClick={onClickButton}>우편번호 찾기</button>
        </div>
        <input type='text' readOnly required placeholder='주소' ref={address1Ref} {...address1.data} />
        <input type='text' placeholder='상세주소' ref={address2Ref} {...address2.data} />
        <button>주소 등록하기</button>
      </form>
    </>
  );
}
