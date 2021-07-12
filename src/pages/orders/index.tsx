/* eslint-disable dot-notation */
import * as React from 'react';
import { useParams, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { OrderListComponent } from '@/components/common/order-list';
import { Container } from '@/components/ui';
import styled from '@/styled';
import { twoDigit } from '@/utils';
import { ApiCall } from '@/services/api';
import { useLoadingContext } from '@/contexts/loading-context';
import { useGetAllOrders } from '@/queries/paginated/use-get-all-orders';
import { IOrder, TOrderStatus } from '@/utils/api/api-models';

/*
  OrdersPage Helpers
*/
interface OrdersPageProps {}
interface RouteParams {
  userId: string;
}
/*
  OrdersPage Colors // TODO : move theme.json
*/
/*
  OrdersPage Strings
*/

/*
  OrdersPage Styles
*/
const StyledPageContainer = styled.div``;
const StyledPageHeader = styled.div`
  display: flex;
`;
const OrdersPage: React.SFC<OrdersPageProps> = props => {
  const loading = useLoadingContext();
  const { t } = useTranslation();
  const { userId } = useParams<RouteParams>();
  const [customer, setCustomer] = React.useState<string>();
  const [sortBy, setSortBy] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [date, setDate] = React.useState<string>();
  const locationState = useLocation().state;
  const [status, setStatus] = React.useState(
    locationState && locationState['status'] ? locationState['status'] : undefined,
  );
  const { data: orders, isLoading, error } = useGetAllOrders({
    pageNumber: 1,
    sortBy,
    sortType,
    userId,
    userName: customer,
    startDate: date,
    status,
  });

  const handleChangeStatus = React.useCallback((e: TOrderStatus) => {
    setStatus(e);
  }, []);
  const handleChangeCustomer = React.useCallback((e: string) => {
    setCustomer(e);
  }, []);
  const handleChangeDate = React.useCallback((e: Date) => {
    setDate(`${twoDigit(e.getDate())}-${twoDigit(e.getMonth() + 1)}-${e.getFullYear()}`);
  }, []);

  const handlePdfBtnClick = React.useCallback(
    (e: IOrder) => {
      loading.show();
      ApiCall.getFile(`/orders/report/pdf/${e.id}`, 'application/pdf')
        .then(data => {
          const url = window.URL.createObjectURL(data);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `order/${e.id}.pdf`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        })
        .finally(() => {
          loading.hide();
        });
    },
    [loading],
  );

  const __ = (
    <Container>
      {!isLoading && !error && (
        <StyledPageContainer>
          <StyledPageHeader>
            <h3>{t('common.orders')}</h3>
          </StyledPageHeader>
          <OrderListComponent
            setStatus={handleChangeStatus}
            status={status}
            setSortBy={setSortBy}
            setSortType={setSortType}
            orders={orders.values}
            elementCountOfPage={orders.elementCountOfPage}
            setCustomer={handleChangeCustomer}
            setDate={handleChangeDate}
            handlePdfBtnClick={handlePdfBtnClick}
          />
        </StyledPageContainer>
      )}
    </Container>
  );

  /*
  OrdersPage Lifecycle
  */

  /*
  OrdersPage Functions
  */

  return __;
};

const _OrdersPage = OrdersPage;

export { _OrdersPage as OrdersPage };
