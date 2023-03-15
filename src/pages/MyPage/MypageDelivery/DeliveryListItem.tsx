import React, { useCallback, useState } from 'react';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import { IOrder, IOrderDetail } from '@/types/tables.types';
import { useOrderDetailByOrderId } from '@/hooks/trueQuery/orderDetail';
import { useProductById } from '@/hooks/trueQuery/product';
import { getItemString } from '@/utils';
import { useCategoryById } from '@/hooks/trueQuery/category';
import { ItemRate } from '@/components/Content';
import { listDetail } from './style';
import { setDate } from '@/utils/setDate';

interface IDeliveryListItemProps {
  item: IOrder;
  status: string;
}

export function DeliveryListItem({ item, status, }: IDeliveryListItemProps) {
  const [ isOpen, setIsOpen, ] = useState(false);

  const orderDetail = useOrderDetailByOrderId(item.orderId, {
    enabled: 'orderId' in item,
  });
  const product = useProductById(orderDetail[0]?.productDTO?.productId, {
    enabled: orderDetail.length > 0,
  });
  const sheet = useCategoryById(orderDetail[0]?.option_sheet, {
    enabled: orderDetail.length > 0,
  }).categoryName;
  const shape = useCategoryById(orderDetail[0]?.option_shape, {
    enabled: orderDetail.length > 0,
  }).categoryName;
  const cream = useCategoryById(orderDetail[0]?.option_cream, {
    enabled: orderDetail.length > 0,
  }).categoryName;
  const size = useCategoryById(orderDetail[0]?.option_size, {
    enabled: orderDetail.length > 0,
  }).categoryName;

  const onClickOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const getString = (array: IOrderDetail[] = []) => {
    let string: string;

    if (array.length === 1) {
      string = getItemString(
        {
          sheet, shape, cream, size,
        },
        product,

        orderDetail[0]
      ).itemString;
    }

    if (array.length >= 2) {
      string = getItemString(
        {
          sheet, shape, cream, size,
        },
        product,

        orderDetail[0]
      ).itemString;
      string = `${string} 외 (${array.length - 1}개)`;
    } else {
      return;
    }

    return string;
  };

  return (
    <>
      <div className='list-content'>
        <p>
          <Link to={`/mypage/order/${item.orderId}`}>{item.orderId}</Link>
        </p>
        <p>
          <span>{getString(orderDetail)}</span>
          <button onClick={onClickOpen}>자세히 보기</button>
        </p>
        <p>{item.price.toLocaleString()}원</p>
        <p>{setDate(item.date)}</p>
      </div>
      {isOpen && (
        <div className='list-detail' css={listDetail}>
          {status === 'not-complete' && orderDetail
            .filter((item) => item.status !== '배송완료')
            .map((item) => (
              <DeliveryDetailItem key={item.orderDnb} item={item} />
            ))}
          {status === 'complete' && orderDetail
            .filter((item) => item.status === '배송완료')
            .map((item) => (
              <DeliveryDetailItem key={item.orderDnb} item={item} />
            ))}
        </div>
      )}
    </>
  );
}

interface IDeliveryDetailItemProps {
  item: IOrderDetail;
}

export function DeliveryDetailItem({ item, }: IDeliveryDetailItemProps) {
  const product = useProductById(item.productDTO?.productId, {
    enabled: item && 'orderDNb' in item,
  });
  const sheet = useCategoryById(item.option_sheet, {
    enabled: item && 'orderDNb' in item,
  }).categoryName;
  const shape = useCategoryById(item.option_shape, {
    enabled: item && 'orderDNb' in item,
  }).categoryName;
  const cream = useCategoryById(item.option_cream, {
    enabled: item && 'orderDNb' in item,
  }).categoryName;
  const size = useCategoryById(item.option_sheet, {
    enabled: item && 'orderDNb' in item,
  }).categoryName;

  const { itemString, itemTotalPrice, } = getItemString(
    {
      sheet, shape, cream, size,
    },
    product,
    item
  );

  return (
    <div>
      <img src={product.image} alt={product.name} />
      <div>
        <p>{itemString}</p>
        <p>{itemTotalPrice}원</p>
        <p>{item.status}</p>
        <ItemRate rate={product.star} styles={tw`justify-start`} />
      </div>
    </div>
  );
}
