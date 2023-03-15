import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import tw from 'twin.macro';
import { useQueryClient } from 'react-query';
import { useCookies } from 'react-cookie';
import { AdminLayout, AppLayout } from '@/layouts';
import { useRefundById, useUpdateRefund } from '@/hooks/trueQuery/refund';
import { useOrderDetailById } from '@/hooks/trueQuery/orderDetail';
import { Heading2, ItemRate } from '@/components/Content';
import { orderDetailDataStyle, refundDataStyle } from './style';
import { getItemString } from '@/utils';
import { useCategoryById } from '@/hooks/trueQuery/category';
import { IRefund } from '@/types/tables.types';
import { useUserById } from '@/hooks/trueQuery/users';

export function RefundItem() {
  const [ isEdit, setIsEdit, ] = useState(false);
  const [ label, setLabel, ] = useState('수정');
  const [ status, setStatus, ] = useState('');

  const [ { id, role, }, ] = useCookies([ 'id', 'role', ]);
  const { id: refundId, } = useParams();
  const navi = useNavigate();
  const refund = useRefundById(Number(refundId), role);
  const orderDetail = useOrderDetailById(refund?.orderDetailDTO?.orderDnb, {
    enabled: 'refundId' in refund,
  });
  const { productDTO, } = orderDetail;
  const user = useUserById(id);
  const updateRefund = useUpdateRefund(Number(refundId));
  const qc = useQueryClient();

  useEffect(() => {
    if ('refundId' in refund) {
      setStatus(refund.status);
    }
  }, [ refund, ]);

  const onChangeStatus = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  }, []);

  const onClickEdit = useCallback(() => {
    if (isEdit) {
      const updateData: IRefund = {
        ...refund,
        userDTO: refund.userDTO,
        refundId: refund.refundId,
        status,
      };

      updateRefund.mutate(updateData, {
        onSuccess: () => {
          qc.refetchQueries([ 'getRefundById', Number(refundId), ]);
          qc.refetchQueries([ 'getRefunds', ]);
        },
      });
      console.log(`[PUT /refunds/${refundId}]`, updateData);

      setIsEdit(false);
      setLabel('수정');
      navi('/admin/refunds');
    } else {
      setIsEdit(true);
      setLabel('수정 완료');
    }
  }, [ isEdit, status, user, updateRefund, ]);

  console.log('orderDetail >> ', orderDetail);
  console.log('product >> ', productDTO);

  const sheet = useCategoryById(orderDetail?.option_sheet).categoryName;
  const shape = useCategoryById(orderDetail?.option_shape).categoryName;
  const cream = useCategoryById(orderDetail?.option_cream).categoryName;
  const size = useCategoryById(orderDetail?.option_size).categoryName;

  const selection = {
    sheet,
    shape,
    cream,
    size,
  };

  const { itemString, itemTotalPrice, } = getItemString(selection, productDTO, orderDetail);

  return (
    <>
      <AppLayout title={`반품 상세 정보(${refundId})`}>
        <AdminLayout pageId='admin-refund-item-page'>
          <Heading2>반품 상세 정보 (반품 아이디: {refundId})</Heading2>
          <div css={refundDataStyle}>
            <div className='data-title'>
              <p>제목</p>
              <p>{refund.title}</p>
            </div>
            <div className='data-content'>
              <p>반품 사유</p>
              <textarea
                value={refund.content}
                readOnly
                disabled
              />
            </div>
            <div className='data-status'>
              <p>처리 상태</p>
              <select disabled={isEdit === false} value={status} onChange={onChangeStatus}>
                <option value='반품요청'>반품 요청</option>
                <option value='처리중'>처리중</option>
                <option value='반품확정'>반품 확정</option>
                <option value='반품완료'>반품 완료</option>
              </select>
              <button onClick={onClickEdit}>{label}</button>
            </div>
            <div className='data-image'>
              {refund.image_1 && (
                <img src={refund.image_1} alt='참고 이미지 1' />
              )}
              {refund.image_2 && (
                <img src={refund.image_2} alt='참고 이미지 2' />
              )}
            </div>
          </div>

          <Heading2>반품한 상품 정보</Heading2>
          <div className='data-order-detail' css={orderDetailDataStyle}>
            <img src={productDTO?.image} alt={productDTO?.name} />
            <div>
              <h3>{itemString}</h3>
              <p>{itemTotalPrice}원</p>
              <ItemRate rate={productDTO?.star} styles={tw`justify-start`} />
            </div>
          </div>
        </AdminLayout>
      </AppLayout>
    </>
  );
}
