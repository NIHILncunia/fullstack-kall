import React, { useCallback, useState } from 'react';
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import { IAddress } from '@/types/tables.types';
import { buttonStyle } from './style';
import { AddressUpdateForm } from '../AddressUpdateForm/AddressUpdateForm';
import { useDeleteAddress } from '@/hooks/trueQuery/address';

interface IAddressListItemProps {
  item: IAddress;
  selectedAddress: number;
  setSelectedAddress: React.Dispatch<React.SetStateAction<number>>;
}

export function AddressListItem({ item, selectedAddress, setSelectedAddress, }: IAddressListItemProps) {
  const [ isOpen, setIsOpen, ] = useState(false);
  const deleteAddress = useDeleteAddress(item.userDTO?.userId);

  const onChnageAddress = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress(Number(event.target.value));
  }, []);

  const onClickUpdate = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onClickDelete = useCallback(() => {
    deleteAddress.mutate(item.usAddressId);
  }, [ item, ]);

  return (
    <>
      <div key={item.usAddressId} className='list-content'>
        <p>
          <label htmlFor={item.usAddressId.toString()}>
            <input
              type='radio'
              id={item.usAddressId.toString()}
              name='address'
              value={item.usAddressId}
              onChange={onChnageAddress}
              checked={selectedAddress === item.usAddressId}
              hidden
            />
            <span>
              {selectedAddress === item.usAddressId && <IoMdRadioButtonOn />}
              {selectedAddress !== item.usAddressId && <IoMdRadioButtonOff />}
            </span>
          </label>
        </p>
        <p>{item.addressName}</p>
        <p>{item.zip_code} - {item.address_1} {item.address_2}</p>
        <button css={buttonStyle} onClick={onClickUpdate} disabled={isOpen}>수정</button>
        <button css={buttonStyle} onClick={onClickDelete}>삭제</button>
      </div>
      {isOpen && (
        <AddressUpdateForm setIsOpen={setIsOpen} item={item} />
      )}
    </>
  );
}
