import * as React from 'react';
import { useParams, useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import styled, { colors, css } from '@/styled';
import { UIContainer } from '@/components/ui';
import { useGetOrder } from '@/queries/use-get-order';
import { useOrderConfirmMutation } from '@/queries/mutations/use-order-confirm';
import { useUpdateOrderMutation } from '@/queries/mutations/use-update-order';
import { IOrderItems } from '@/utils/api/api-models';
import { Button, Row, Col } from 'react-bootstrap';
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
    <UIContainer className="order_details">
      {order && !orderLoading && !error && (
        <>
          <Row className="buyer_details">
            <Col className="order_detail_text_wrapper my-4" xl={12} lg={12} sm={12} md={12}>
              <h5>Siparis Detayi</h5>
            </Col>
            <Col xl={6} lg={6} sm={12} md={6}>
              <div>
                <h5>Alici</h5>
                <p>{order.buyerName}</p>
              </div>
            </Col>
            <Col className="d-flex justify-content-end" xl={6} lg={6} sm={12} md={6}>
              <div>
                <h5>Sehir / Ilce</h5>
                <p>
                  {order.buyerAddress.cityName} / {order.buyerAddress.stateName}
                </p>
              </div>
            </Col>
            <Col xl={6} lg={6} sm={12} md={6}>
              <div>
                <h5>Siparis Tarihi</h5>
                <p>{order.orderDate}</p>
              </div>
            </Col>
            <Col className="d-flex justify-content-end" xl={6} lg={6} sm={12} md={6}>
              <div>
                <h5>Siparis No</h5>
                <p>{order.id.slice(0, 10)}</p>
              </div>
            </Col>
            <Col xl={6} lg={6} sm={12} md={6}>
              <div>
                <h5>Siparis Durumu</h5>
                <p>{t(`order.status.${order.status.toString().toLowerCase()}`)}</p>
              </div>
            </Col>
            <Col className="d-flex justify-content-end" xl={6} lg={6} sm={12} md={6}>
              <div>
                <h5>Odeme Yontemi</h5>
                <p>{t(`order.payment.${order.paymentType.toString().toLowerCase()}`)}</p>
              </div>
            </Col>
            <Col xl={12} lg={12} sm={12} md={12}>
              <div>
                <h5>Adres Detayi</h5>
                <p>{order.buyerAddress.details}</p>
              </div>
            </Col>
            <Col xl={12} lg={12} sm={12} md={12}>
              <div className="d-flex justify-content-between">
                <h5>Toplam Fiyat</h5>
                <h5>{order.totalPrice} TL</h5>
              </div>
            </Col>
          </Row>

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
                <Button className={cancelButton} onClick={handleCancelRequest}>
                  Iptal Istegi Yolla
                </Button>
                <Button onClick={handleOrderConfirm}>Onayla</Button>
              </StyledOrderActionsWrapper>
            )}
          </div>
        </>
      )}
    </UIContainer>
  );
}
const PureOrderPage = React.memo(OrderPage);

export { PureOrderPage as OrderPage };
