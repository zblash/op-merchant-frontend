import * as React from 'react';
import { ObligationComponent } from '@/components/page-components/obligation';
import { AnnouncementComponent, UIContainer, DaysOfWeek } from '@zblash/op-web-fronted';
import { useGetOrderSummary } from '@/queries/use-get-order-summary';
import { useGetAnnouncements } from '@/queries/use-get-announcements';
import { useGetObligationTotal } from '@/queries/use-get-obligation-total';
import { useGetShippingDays } from '@/queries/use-get-shipping-days';
import { ShippingDaysComponent } from '@/components/page-components/shipping-days';
import { useGetStatesForShippingDays } from '@/queries/use-get-states-for-shipping-days';
import { useAddShippingDays } from '@/queries/mutations/use-add-shipping-days';
import { useEditShippingDays } from '@/queries/mutations/use-edit-shipping-days';
import { OrdersSummaryComponent } from '@/components/page-components/orders-summary';
import { Row, Col } from 'react-bootstrap';

/* MerchantHome Helpers */
interface MerchantHomeProps {}

/* MerchantHome Constants */

/* MerchantHome Styles */

/* MerchantHome Component  */
function MerchantHome(props: React.PropsWithChildren<MerchantHomeProps>) {
  /* MerchantHome Variables */

  const { data: orderSummary, isLoading: orderSummaryLoading, error: orderSummaryError } = useGetOrderSummary();

  const { data: announcements, isLoading: announcementsLoading, error: announcementsError } = useGetAnnouncements();

  const { data: totalObligation, isLoading: obligationLoading, error: obligationError } = useGetObligationTotal();

  const { data: shippingDays, isLoading: shippingDaysLoading, error: shippingDaysError } = useGetShippingDays();

  const { mutate: addShippingDays } = useAddShippingDays();

  const { mutate: editShippingDays } = useEditShippingDays();

  const {
    data: statesForShippingDays,
    isLoading: statesForShippingDaysLoading,
    error: statesForShippingDaysError,
  } = useGetStatesForShippingDays();
  /* MerchantHome Callbacks */

  /* MerchantHome Lifecycle  */

  return (
    <UIContainer>
      {!orderSummaryError && !orderSummaryLoading && (
        <Row className="mt-3">
          <Col lg={12} md={12} xl={12} sm={12} xs={12} className="mb-3 pr-0">
            <OrdersSummaryComponent orderSummary={orderSummary} />
          </Col>
        </Row>
      )}
      <Row className="mt-3">
        {!obligationError && !obligationLoading && (
          <Col lg={3} md={3} xl={3} sm={12} xs={12} className="float-md-right order-md-3">
            <ObligationComponent obligation={totalObligation} />
          </Col>
        )}
        {!shippingDaysError && !shippingDaysLoading && !statesForShippingDaysLoading && !statesForShippingDaysError && (
          <>
            <Col lg={8} md={8} xl={8} sm={12} xs={12}>
              <ShippingDaysComponent
                shippingDays={shippingDays}
                statesForShippingDays={statesForShippingDays}
                onAddSubmit={(stateId: string, days: DaysOfWeek[]) => {
                  addShippingDays({ stateId, days });
                }}
                onEditSubmit={(id: string, days: DaysOfWeek[]) => {
                  editShippingDays({ shippingDaysId: id, days });
                }}
              />
            </Col>
            <Col lg={1} md={1} xl={1} className="order-md-2" />
          </>
        )}
      </Row>

      {!announcementsError && !announcementsLoading && (
        <Row className="mt-3">
          <Col lg={12} md={12} xl={12} sm={12} xs={12} className="mb-3">
            <AnnouncementComponent announcements={announcements} />
          </Col>
        </Row>
      )}
    </UIContainer>
  );
}
const PureMerchantHome = React.memo(MerchantHome);

export { PureMerchantHome as MerchantHome };
