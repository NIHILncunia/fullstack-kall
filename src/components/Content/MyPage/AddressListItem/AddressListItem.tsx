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
  const deleteAddress = useDeleteAddress(item.user_id);

  const onChnageAddress = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress(Number(event.target.value));
  }, []);

  const onClickUpdate = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onClickDelete = useCallback(() => {
    deleteAddress.mutate(item.id);
  }, [ item, ]);

  return (
    <>
      <div key={item.id} className='list-content'>
        <p>
          <label htmlFor={item.id.toString()}>
            <input
              type='radio'
              id={item.id.toString()}
              name='address'
              value={item.id}
              onChange={onChnageAddress}
              checked={selectedAddress === item.id}
              hidden
            />
            <span>
              {selectedAddress === item.id && <IoMdRadioButtonOn />}
              {selectedAddress !== item.id && <IoMdRadioButtonOff />}
            </span>
          </label>
        </p>
        <p>{item.address_name}</p>
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
