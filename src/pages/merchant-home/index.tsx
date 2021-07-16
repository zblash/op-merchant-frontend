import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { colors, css } from '@/styled';
import { ObligationComponent } from '@/components/common/obligation';
import { Container, UILink } from '@/components/ui';
import { AnnouncementComponent } from '@/components/common/announcements';
import { useGetOrderSummary } from '@/queries/use-get-order-summary';
import { useGetAnnouncements } from '@/queries/use-get-announcements';
import { useGetObligationTotal } from '@/queries/use-get-obligation-total';
import { useGetShippingDays } from '@/queries/use-get-shipping-days';
import { ShippingDaysComponent } from '@/components/common/shipping-days';
import { useGetStatesForShippingDays } from '@/queries/use-get-states-for-shipping-days';
import { useAddShippingDays } from '@/queries/mutations/use-add-shipping-days';
import { DaysOfWeek } from '@/utils/api/api-models';
import { useEditShippingDays } from '@/queries/mutations/use-edit-shipping-days';

/* MerchantHome Helpers */
interface MerchantHomeProps {}

/* MerchantHome Constants */

/* MerchantHome Styles */
const StyledMerchantHomeWrapper = styled.div`
  margin-top: 25px;
`;
const StyledOrderSummaryWrapper = styled.div`
  width: 60%;
  float: left;
  padding: 0 15px 24px 15px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: ${colors.white};
`;
const StyledOrderSummaryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.lightGray}
  padding: 0 10px 0 10px;
  font-size: 14px;
  margin-bottom: 15px;
`;
const StyledOrderSummaryContentWrapper = styled.div`
  padding: 0 10px 0 10px;
  border: 1px solid ${colors.lightGray};
`;
const StyledOrderSummaryMenu = styled.ul`
  display: table;
  table-layout: fixed;
  width: 100%;
  list-style: none;
  padding-inline-start: 0;
`;
const StyledOrderSummaryItem = styled.li`
  display: table-cell;
  text-align: center;
  border-right: 1px solid ${colors.lightGray};
  :last-child {
    border: 0;
  }
`;
const StyledLink = styled(UILink)`
  color: ${colors.primaryDark};
`;

const orderSummaryItemI = css`
  font-size: 24px;
  font-style: normal;
  display: block;
`;
/* MerchantHome Component  */
function MerchantHome(props: React.PropsWithChildren<MerchantHomeProps>) {
  /* MerchantHome Variables */
  const { t } = useTranslation();

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
    <Container>
      <StyledMerchantHomeWrapper>
        {!orderSummaryError && !orderSummaryLoading && (
          <StyledOrderSummaryWrapper>
            <StyledOrderSummaryHeader>
              <h3>Siparis Ozeti</h3>
              <p>
                <StyledLink to="/orders">{t('common.details')}</StyledLink>
              </p>
            </StyledOrderSummaryHeader>
            <StyledOrderSummaryContentWrapper>
              <StyledOrderSummaryMenu>
                <StyledOrderSummaryItem>
                  <p>
                    <StyledLink to="/orders" state={{ status: 'NEW' }} className={orderSummaryItemI}>
                      {orderSummary.newCount}
                    </StyledLink>
                    Yeni Siparis
                  </p>
                </StyledOrderSummaryItem>
                <StyledOrderSummaryItem>
                  <p>
                    <StyledLink to="/orders" state={{ status: 'FINISHED' }} className={orderSummaryItemI}>
                      {orderSummary.finishedCount}
                    </StyledLink>
                    Tamamlanan Siparis
                  </p>
                </StyledOrderSummaryItem>
                <StyledOrderSummaryItem>
                  <p>
                    <StyledLink to="/orders" state={{ status: 'CANCELLED' }} className={orderSummaryItemI}>
                      {orderSummary.cancelledCount}
                    </StyledLink>
                    Iptal Olan Siparis
                  </p>
                </StyledOrderSummaryItem>
                <StyledOrderSummaryItem>
                  <p>
                    <StyledLink to="/orders" state={{ status: 'CANCEL_REQUEST' }} className={orderSummaryItemI}>
                      {orderSummary.cancelRequestCount}
                    </StyledLink>
                    Iptal Isteginde Olan Siparis
                  </p>
                </StyledOrderSummaryItem>
                <StyledOrderSummaryItem>
                  <p>
                    <StyledLink to="/orders" state={{ status: 'CONFIRMED' }} className={orderSummaryItemI}>
                      {orderSummary.submittedCount}
                    </StyledLink>
                    Onaylanan Siparis
                  </p>
                </StyledOrderSummaryItem>
              </StyledOrderSummaryMenu>
            </StyledOrderSummaryContentWrapper>
          </StyledOrderSummaryWrapper>
        )}
        {!obligationError && !obligationLoading && <ObligationComponent obligation={totalObligation} />}
        {!shippingDaysError && !shippingDaysLoading && !statesForShippingDaysLoading && !statesForShippingDaysError && (
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
        )}
        {!announcementsError && !announcementsLoading && <AnnouncementComponent announcements={announcements} />}
      </StyledMerchantHomeWrapper>
    </Container>
  );
}
const PureMerchantHome = React.memo(MerchantHome);

export { PureMerchantHome as MerchantHome };
