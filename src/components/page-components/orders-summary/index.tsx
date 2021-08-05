import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { IOrderSummary } from '@/utils/api/api-models';
import { UILink } from '@/components/ui';
import { UITableComponent } from '@/components/ui/table/index';

interface OrdersSummaryComponentProps {
  orderSummary: IOrderSummary;
}

/* OrdersSummaryComponent Component  */
function OrdersSummaryComponent(props: React.PropsWithChildren<OrdersSummaryComponentProps>) {
  /* OrdersSummaryComponent Variables */

  /* OrdersSummaryComponent Callbacks */

  /* OrdersSummaryComponent Lifecycle  */
  return (
    <Row>
      <Col lg={12} md={12} sm={12} xl={12} xs={12} className="mb-2 d-flex justify-content-between align-items-center">
        <h3 className="font-size-19-bold">Siparis Ozeti</h3>
        <UILink className="text-underline" to="/orders">
          Detaylari Gor
        </UILink>
      </Col>
      <Col lg={12} md={12} sm={12} xl={12} xs={12} className="">
        <UITableComponent
          columns={[
            {
              Header: 'Yeni Siparis',
              accessor: 'newOrderCount',
              customRenderer: (item: IOrderSummary) => (
                <UILink className="font-weight-bold" to="/orders" state={{ status: 'NEW' }}>
                  {item.newCount}
                </UILink>
              ),
            },
            {
              Header: 'Tamamlanan Siparis',
              accessor: 'finishedOrderCount',
              customRenderer: (item: IOrderSummary) => (
                <UILink className="font-weight-bold" to="/orders" state={{ status: 'FINISHED' }}>
                  {item.finishedCount}
                </UILink>
              ),
            },
            {
              Header: 'Iptal Olan Siparis',
              accessor: 'cancelledOrderCount',
              customRenderer: (item: IOrderSummary) => (
                <UILink className="font-weight-bold" to="/orders" state={{ status: 'CANCELLED' }}>
                  {item.cancelledCount}
                </UILink>
              ),
            },
            {
              Header: 'Iptal Istekleri',
              accessor: 'cancelRequestOrderCount',
              customRenderer: (item: IOrderSummary) => (
                <UILink className="font-weight-bold" to="/orders" state={{ status: 'CANCEL_REQUEST' }}>
                  {item.cancelRequestCount}
                </UILink>
              ),
            },
            {
              Header: 'Onaylanan Siparis',
              accessor: 'submittedOrderCount',
              customRenderer: (item: IOrderSummary) => (
                <UILink className="font-weight-bold" to="/orders" state={{ status: 'CONFIRMED' }}>
                  {item.submittedCount}
                </UILink>
              ),
            },
          ]}
          data={[props.orderSummary]}
        />
      </Col>
    </Row>
  );
}
const PureOrdersSummaryComponent = React.memo(OrdersSummaryComponent);

export { PureOrdersSummaryComponent as OrdersSummaryComponent };
