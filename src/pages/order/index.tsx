import * as React from 'react';
import { useParams, useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  UIContainer,
  UIInput,
  UITableComponent,
  UISelect,
  IOrderItems,
  TOrderStatus,
} from '@onlineplasiyer/op-web-fronted';
import { useGetOrder } from '@/queries/use-get-order';
import { useConfirmOrderMutation } from '@/queries/mutations/use-confirm-order';
import { useUpdateOrderMutation } from '@/queries/mutations/use-update-order';
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

/* OrderPage Component  */
function OrderPage(props: React.PropsWithChildren<OrderPageProps>) {
  /* OrderPage Variables */
  const { t } = useTranslation();
  const routerHistory = useHistory();
  const firstRender = React.useRef(true);
  const [orderItems, setOrderItems] = React.useState<Array<OrderItem>>();
  const { orderId } = useParams<RouteParams>();
  const [selectedStatus, setSelectedStatus] = React.useState<TOrderStatus>();
  const { data: order, isLoading: orderLoading, error } = useGetOrder(orderId);

  const { mutateAsync: confirmOrder } = useConfirmOrderMutation();

  const { mutateAsync: updateOrderAsync } = useUpdateOrderMutation();

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
    updateOrderAsync({
      id: orderId,
      status: 'CANCEL_REQUEST',
    }).finally(() => {
      routerHistory.push('/orders');
    });
  }, [updateOrderAsync, orderId, routerHistory]);

  const updateOrderRequest = React.useCallback(() => {
    updateOrderAsync({
      id: orderId,
      status: selectedStatus,
    }).finally(() => {
      routerHistory.push('/orders');
    });
  }, [orderId, routerHistory, selectedStatus, updateOrderAsync]);
  /* OrderPage Lifecycle  */

  React.useEffect(() => {
    if (!orderLoading && order.orderItems && firstRender.current) {
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
          <Row className="buyer_details_text_wrapper mb-5">
            <Row className="w-100 m-0 ">
              <Col className="order_detail_text_wrapper my-4" xl={12} lg={12} sm={12} md={12}>
                <h5>Siparis Detayi</h5>
              </Col>
            </Row>
            <Row className="w-100 m-0 d-flex justify-content-between py-2 buyer_details">
              <Col className="d-flex justify-content-start" xl={2} lg={3} sm={3} md={3}>
                <div>
                  <h5>Alici</h5>
                  <p>{order.buyerName}</p>
                </div>
              </Col>
              <Col className="d-flex justify-content-start" xl={2} lg={3} sm={3} md={3}>
                <div>
                  <h5>Sehir / Ilce</h5>
                  <p>
                    {order.buyerAddress.cityName} / {order.buyerAddress.stateName}
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="w-100 m-0 d-flex justify-content-between py-2 buyer_details">
              <Col className="d-flex justify-content-start" xl={2} lg={3} sm={3} md={3}>
                <div>
                  <h5>Siparis Tarihi</h5>
                  <p>{order.orderDate}</p>
                </div>
              </Col>
              <Col className="d-flex justify-content-start" xl={2} lg={3} sm={3} md={3}>
                <div>
                  <h5>Siparis No</h5>
                  <p>{order.id.slice(0, 10)}</p>
                </div>
              </Col>
            </Row>
            <Row className="w-100 m-0 d-flex justify-content-between py-2 buyer_details">
              <Col className="d-flex justify-content-start" xl={2} lg={3} sm={3} md={3}>
                <div>
                  <h5>Siparis Durumu</h5>
                  <p>{t(`order.status.${order.status.toString().toLowerCase()}`)}</p>
                </div>
              </Col>
              <Col className="d-flex justify-content-start" xl={2} lg={3} sm={3} md={3}>
                <div>
                  <h5>Odeme Yontemi</h5>
                  <p>{t(`order.payment.${order.paymentType.toString().toLowerCase()}`)}</p>
                </div>
              </Col>
            </Row>
            <Row className="w-100 m-0 d-flex justify-content-between py-2 buyer_details">
              <Col xl={12} lg={12} sm={12} md={12}>
                <div>
                  <h5>Adres Detayi</h5>
                  <p>{order.buyerAddress.details}</p>
                </div>
              </Col>
            </Row>
            <Row className="w-100 m-0 d-flex justify-content-between py-2 my-4 buyer_details total_price_wrapper">
              <Col xl={12} lg={12} sm={12} md={12}>
                <div className="d-flex justify-content-between">
                  <h5>Toplam Fiyat</h5>
                  <h5>{order.totalPrice} TL</h5>
                </div>
              </Col>
            </Row>
          </Row>
          <Row className="mb-5">
            <Col />
            <Col xs="12" xl="2" lg="2" md="2">
              {(order.status === 'CONFIRMED' || order.status === 'PREPARED' || order.status === 'ON_WAY') && (
                <>
                  <UISelect
                    labelClassName="font-weight-bold"
                    options={[
                      { value: 'PREPARED', label: 'Hazirlaniyor/Hazir' },
                      { value: 'ON_WAY', label: 'Yola Cikti' },
                    ]}
                    placeholderKey="Secim Yapin"
                    labelKey="Siparis Durumu"
                    inputClassName="border"
                    onChange={(e: { value: TOrderStatus; label: string }) => {
                      setSelectedStatus(e.value);
                    }}
                  />
                  <Button className="float-right w-100" variant="secondary" onClick={updateOrderRequest}>
                    Siparis Durumunu Guncelle
                  </Button>
                </>
              )}
            </Col>
          </Row>
          <div>
            {orderItems && orderItems.length && (
              <UITableComponent
                columns={[
                  {
                    Header: 'Urun Ismi',
                    accessor: 'productName',
                  },
                  {
                    Header: 'Promosyon',
                    accessor: 'promotion',
                    customRenderer: (orderItem: IOrderItems) =>
                      orderItem.promotionText !== undefined ? orderItem.promotionText : 'Yok',
                  },
                  {
                    Header: 'S.Birimi',
                    accessor: 'unitType',
                  },
                  {
                    Header: 'B. Icerigi',
                    accessor: 'unitContents',
                  },
                  {
                    Header: 'KDV',
                    accessor: 'KDV',
                    customRenderer: (orderItem: IOrderItems) => `%${orderItem.productTax}`,
                  },
                  {
                    Header: 'KDV Dhl. Birim Fiyat',
                    accessor: 'unitPrice',
                  },
                  {
                    Header: 'K. Fiyati',
                    accessor: 'price',
                  },
                  {
                    Header: 'Indirim Tutari',
                    accessor: 'dPrice',
                    customRenderer: (orderItem: IOrderItems) =>
                      `${orderItem.totalPrice - orderItem.discountedTotalPrice} TL`,
                  },
                  {
                    Header: 'Indirimli Toplam Fiyat',
                    accessor: 'discountedTotalPrice',
                  },
                  {
                    Header: 'Talep Edilen Adet',
                    accessor: 'requestedQuantity',
                  },
                  {
                    Header: 'Gonderilecek Adet',
                    accessor: 'quantity',
                    customRenderer: (item: OrderItem) => (
                      <UIInput type="number" value={item.quantity} name={item.id} onChange={handleQuantityChange} />
                    ),
                  },
                  {
                    Header: 'Kaldir',
                    accessor: 'remove',
                    customRenderer: (item: OrderItem) => (
                      <input type="checkbox" name={item.id} checked={item.isRemoved} onChange={handleItemRemove} />
                    ),
                  },
                ]}
                data={orderItems}
              />
            )}
          </div>
          <Row className="mb-5">
            <Col />
            <Col className="d-flex justify-content-end">
              {order.status === 'NEW' && (
                <>
                  <Button className="mr-3" onClick={handleCancelRequest}>
                    Iptal Istegi Yolla
                  </Button>
                  <Button variant="secondary" onClick={handleOrderConfirm}>
                    Onayla
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </>
      )}
    </UIContainer>
  );
}
const PureOrderPage = React.memo(OrderPage);

export { PureOrderPage as OrderPage };
