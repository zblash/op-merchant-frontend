import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { IOrderSummary } from '@/utils/api/api-models';
import { UILink } from '@/components/ui';

interface OrdersSummaryComponentProps {
  orderSummary: IOrderSummary;
}

/* OrdersSummaryComponent Component  */
function OrdersSummaryComponent(props: React.PropsWithChildren<OrdersSummaryComponentProps>) {
  /* OrdersSummaryComponent Variables */

  /* OrdersSummaryComponent Callbacks */

  /* OrdersSummaryComponent Lifecycle  */

  return (
    <Row className="border rounded py-2">
      <Col lg={12} md={12} sm={12} xl={12} xs={12} className="border-bottom p-2 mb-2 d-flex justify-content-between">
        <h3>Siparis Ozeti</h3>
        <UILink to="/orders">Detaylari Gor</UILink>
      </Col>
      <Col lg={12} md={12} sm={12} xl={12} xs={12} className="">
        <div className="w-20 float-left border rounded d-flex align-items-center flex-column">
          <UILink to="/orders" state={{ status: 'NEW' }}>
            {props.orderSummary.newCount}
          </UILink>
          <span>Yeni Siparis</span>
        </div>
        <div className="w-20 float-left border rounded d-flex align-items-center flex-column">
          <UILink to="/orders" state={{ status: 'FINISHED' }}>
            {props.orderSummary.finishedCount}
          </UILink>
          <span>Tamamlanan Siparis</span>
        </div>
        <div className="w-20 float-left border rounded d-flex align-items-center flex-column">
          <UILink to="/orders" state={{ status: 'CANCELLED' }}>
            {props.orderSummary.cancelledCount}
          </UILink>
          <span>Iptal Olan Siparis</span>
        </div>
        <div className="w-20 float-left border rounded d-flex align-items-center flex-column">
          <UILink to="/orders" state={{ status: 'CANCEL_REQUEST' }}>
            {props.orderSummary.cancelRequestCount}
          </UILink>
          <span>Iptal Istekleri</span>
        </div>
        <div className="w-20 float-left border rounded d-flex align-items-center flex-column">
          <UILink to="/orders" state={{ status: 'CONFIRMED' }}>
            {props.orderSummary.submittedCount}
          </UILink>
          <span>Onaylanan Siparis</span>
        </div>
      </Col>
    </Row>
  );
}
const PureOrdersSummaryComponent = React.memo(OrdersSummaryComponent);

export { PureOrdersSummaryComponent as OrdersSummaryComponent };
