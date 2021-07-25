import * as React from 'react';
import { useParams, useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import styled, { colors, css } from '@/styled';
import { Container, UIButton } from '@/components/ui';
import { useGetOrder } from '@/queries/use-get-order';
import { useOrderConfirmMutation } from '@/queries/mutations/use-order-confirm';
import { useUpdateOrderMutation } from '@/queries/mutations/use-update-order';
import { IOrderItems } from '@/utils/api/api-models';
/* OrderPage Helpers */
interface OrderPageProps {}

interface RouteParams {
  orderId: string;
}

interface OrderItem extends IOrderItems {
  isRemoved: boolean;
}
/* OrderPage Constants */

/* OrderPage Styles */
const StyledOrderPageHeader = styled.div`
  width: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white}
  border: 1px solid ${colors.lightGray}
  border-radius: 8px;
  margin-bottom: 25px;
  margin-top: 25px;
 `;

const StyledOrderWrapper = styled.div`
  width: 100%;
  background-color: ${colors.white} 
  border: 1px solid ${colors.lightGray}
  border-radius: 8px;
  margin-bottom: 25px;
`;
const StyledOrderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid ${colors.lightGray}
  padding: 0 10px 0 10px;
  font-size: 14px;
`;
const StyledOrderHeaderLeftBox = styled.div`
  width: 40%;
`;
const StyledOrderHeaderRightBox = styled.div`
  width: 60%;
`;
const StyledOrderHeaderRightBoxPrice = styled.div`
  width: 50%;
  float: left;
`;
const StyledOrderHeaderRightBoxDetail = styled.div`
  width: 50%;
  float: right;
  direction: rtl;
`;
const StyledOrderItemTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  margin-top: 15px;
  width: 100%;
  > th,
  td {
    text-align: center;
    padding: 8px;
  }
  > tbody > tr:nth-child(odd) {
    background-color: ${colors.lightGray};
  }
`;
const StyledOrderActionsWrapper = styled.div`
  margin: 15px 1em 15px 0;
  width: 20%;
  float: right;
  display: flex;
  justify-content: space-between;
`;

const StyledOrderActionsButton = styled(UIButton)``;

const cancelButton = css`
  background-color: ${colors.lightGray};
`;
const overFlowAuto = css`
  overflow-x: auto;
`;
const quantityInput = css`
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 4px;
  width: 75px;
`;
/* OrderPage Component  */
function OrderPage(props: React.PropsWithChildren<OrderPageProps>) {
  /* OrderPage Variables */
  const { t } = useTranslation();
  const routerHistory = useHistory();
  const firstRender = React.useRef(true);
  const [orderItems, setOrderItems] = React.useState<Array<OrderItem>>([]);
  const { orderId } = useParams<RouteParams>();
  const { data: order, isLoading: orderLoading, error } = useGetOrder(orderId);

  const { mutateAsync: confirmOrder } = useOrderConfirmMutation();

  const { mutateAsync: cancelRequest } = useUpdateOrderMutation();

  /* OrderPage Callbacks */

  const handleItemRemove = React.useCallback(
    (e: any) => {
      const { name, checked } = e.target;
      setOrderItems(orderItems.map(item => (item.id === name ? { ...item, isRemoved: checked } : item)));
    },
    [orderItems],
  );
  const handleQuantityChange = React.useCallback(
    (e: any) => {
      const { name, value } = e.target;
      setOrderItems(orderItems.map(item => (item.id === name ? { ...item, quantity: value } : item)));
    },
    [orderItems],
  );
  const handleOrderConfirm = React.useCallback(() => {
    confirmOrder({
      id: orderId,
      items: orderItems.map(item => {
        return {
          id: item.id,
          quantity: item.quantity,
          removed: item.isRemoved,
        };
      }),
    }).finally(() => {
      routerHistory.push('/orders');
    });
  }, [confirmOrder, orderId, orderItems, routerHistory]);

  const handleCancelRequest = React.useCallback(() => {
    cancelRequest({
      id: orderId,
      status: 'CANCEL_REQUEST',
    }).finally(() => {
      routerHistory.push('/orders');
    });
  }, [cancelRequest, orderId, routerHistory]);
  /* OrderPage Lifecycle  */

  React.useEffect(() => {
    if (!orderLoading && order.orderItems && firstRender) {
      firstRender.current = false;
      setOrderItems(
        order.orderItems.map(item => {
          return { ...item, isRemoved: false };
        }),
      );
    }
  }, [orderLoading, order]);

  return (
    <Container>
      {order && !orderLoading && !error && (
        <>
          <StyledOrderPageHeader>
            <h3>{`${t('order.order-date')} - ${order.orderDate}`}</h3>
          </StyledOrderPageHeader>
          <StyledOrderWrapper>
            <StyledOrderHeader>
              <StyledOrderHeaderLeftBox>
                <p>
                  <span>Sehir : </span>
                  <strong>{order.buyerAddress.cityName}</strong>
                </p>
                <p>
                  <span>Ilce : </span>
                  <strong>{order.buyerAddress.stateName}</strong>
                </p>
              </StyledOrderHeaderLeftBox>
              <StyledOrderHeaderRightBox>
                <StyledOrderHeaderRightBoxPrice>
                  <p>
                    <span>{t('common.customer')} : </span>
                    <strong>{order.buyerName}</strong>
                  </p>
                  <p>
                    <span>{t('common.total-price')} : </span>
                    <strong>{order.totalPrice} TL</strong>
                  </p>
                </StyledOrderHeaderRightBoxPrice>
                <StyledOrderHeaderRightBoxDetail>
                  <p>
                    <span>{t('order.status-text')} : </span>
                    <strong>{t(`order.status.${order.status.toString().toLowerCase()}`)}</strong>
                  </p>
                  <p>
                    <span>{t('common.payment')} : </span>
                    <strong>{t(`order.payment.${order.paymentType.toString().toLowerCase()}`)}</strong>
                  </p>
                </StyledOrderHeaderRightBoxDetail>
              </StyledOrderHeaderRightBox>
            </StyledOrderHeader>
            <StyledOrderHeader>
              <p>
                <span>Acik Adres: </span>
                <strong>{order.buyerAddress.details}</strong>
              </p>
            </StyledOrderHeader>
            <div className={overFlowAuto}>
              <StyledOrderItemTable>
                <thead>
                  <tr>
                    <th>Urun Ismi</th>
                    <th>Birim Fiyat</th>
                    <th>Toplam Fiyat</th>
                    <th>Indirim</th>
                    <th>Indirimli Toplam Fiyat</th>
                    <th>T.E.S Fiyat</th>
                    <th>Toplam Siparis</th>
                    <th>Kaldir</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems &&
                    orderItems.map(orderItem => (
                      <tr key={orderItem.id}>
                        <td>1</td>
                        <td>{orderItem.productName}</td>
                        <td>{orderItem.unitPrice}</td>
                        <td>{orderItem.totalPrice}</td>
                        <td>{(orderItem.totalPrice - orderItem.discountedTotalPrice).toFixed(2)}</td>
                        <td>{orderItem.discountedTotalPrice}</td>
                        <td>{orderItem.recommendedRetailPrice}</td>
                        <td>
                          <input
                            className={quantityInput}
                            type="number"
                            value={orderItem.quantity}
                            name={orderItem.id}
                            onChange={handleQuantityChange}
                          />
                        </td>

                        <td>
                          <input
                            type="checkbox"
                            name={orderItem.id}
                            checked={orderItem.isRemoved}
                            onChange={handleItemRemove}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </StyledOrderItemTable>
              {(order.status === 'CANCEL_REQUEST' || order.status === 'NEW') && (
                <StyledOrderActionsWrapper>
                  <StyledOrderActionsButton className={cancelButton} onClick={handleCancelRequest}>
                    Iptal Istegi Yolla
                  </StyledOrderActionsButton>
                  <StyledOrderActionsButton onClick={handleOrderConfirm}>Onayla</StyledOrderActionsButton>
                </StyledOrderActionsWrapper>
              )}
            </div>
          </StyledOrderWrapper>
        </>
      )}
    </Container>
  );
}
const PureOrderPage = React.memo(OrderPage);

export { PureOrderPage as OrderPage };
