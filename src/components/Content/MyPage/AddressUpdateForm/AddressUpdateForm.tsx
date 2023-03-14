import React, { useCallback, useEffect, useRef } from 'react';
import { useInput } from '@/hooks';
import { IAddress } from '@/types/tables.types';
import { useUpdateAddress } from '@/hooks/trueQuery/address';
import { addressUpdateFormStyle } from './style';

interface IAddressUpdateFormProps {
  item: IAddress;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddressUpdateForm({ item, setIsOpen, }: IAddressUpdateFormProps) {
  const updateAddress = useUpdateAddress(item.usAddressId, item.userDTO?.userId);
  const nameRef = useRef<HTMLInputElement>();
  const zipCodeRef = useRef<HTMLInputElement>();
  const address1Ref = useRef<HTMLInputElement>();
  const address2Ref = useRef<HTMLInputElement>();

  const name = useInput(nameRef, 'name');
  const zipCode = useInput(zipCodeRef, 'zipCode');
  const address1 = useInput(address1Ref, 'address1');
  const address2 = useInput(address2Ref, 'address2');

  useEffect(() => {
    name.setValue(item.addressName);
    zipCode.setValue(item.zip_code);
    address1.setValue(item.address_1);
    address2.setValue(item.address_2);
  }, []);

  const onSubmitForm = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updateData: IAddress = {
      ...item,
      addressName: name.data.value,
      zip_code: zipCode.data.value,
      address_1: address1.data.value,
      address_2: address2.data.value,
    };

    updateAddress.mutate(updateData);

    setIsOpen((prev) => !prev);
  }, [ item, name, zipCode, address1, address2, ]);

  return (
    <>
      <form css={addressUpdateFormStyle} onSubmit={onSubmitForm}>
        <div>
          <input type='text' placeholder='주소 이름' required ref={nameRef} {...name.data} />
          <input type='text' placeholder='우편번호' required ref={zipCodeRef} {...zipCode.data} />
        </div>
        <input type='text' placeholder='주소 1' required ref={address1Ref} {...address1.data} />
        <input type='text' placeholder='주소 2' ref={address2Ref} {...address2.data} />
        <div>
          <button>수정 완료</button>
        </div>
      </form>
    </>
  );
}
