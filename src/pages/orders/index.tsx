/* eslint-disable dot-notation */
import * as React from "react";
import { useParams, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { usePaginationQuery } from "~/services/query-context/use-pagination-quey";
import { paginationQueryEndpoints } from "~/services/query-context/pagination-query-endpoints";
import { OrderListComponent } from "~/components/common/order-list";
import { Container } from "~/components/ui";
import styled from "~/styled";
import { twoDigit } from "~/utils";
import { TOrderStatus, IOrder } from "~/services/helpers/backend-models";
import { ApiCall } from "~/services/api";
import { useLoadingContext } from "~/contexts/loading-context";

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
const OrdersPage: React.SFC<OrdersPageProps> = (props) => {
  const loading = useLoadingContext();
  const { t } = useTranslation();
  const { userId } = useParams<RouteParams>();
  const [customer, setCustomer] = React.useState<string>();
  const [sortBy, setSortBy] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [date, setDate] = React.useState<string>();
  const locationState = useLocation().state;
  const [status, setStatus] = React.useState(
    locationState && locationState["status"]
      ? locationState["status"]
      : undefined
  );
  const {
    data: { values: orders, elementCountOfPage },
  } = usePaginationQuery(paginationQueryEndpoints.getAllOrders, {
    defaultValue: { values: [] },
    variables: {
      sortBy,
      sortType,
      userId,
      userName: customer,
      startDate: date,
      status,
    },
    pageNumber: 1,
  });

  const handleChangeStatus = React.useCallback((e: TOrderStatus) => {
    setStatus(e);
  }, []);
  const handleChangeCustomer = React.useCallback((e: string) => {
    setCustomer(e);
  }, []);
  const handleChangeDate = React.useCallback((e: Date) => {
    setDate(
      `${twoDigit(e.getDate())}-${twoDigit(
        e.getMonth() + 1
      )}-${e.getFullYear()}`
    );
  }, []);

  const handlePdfBtnClick = React.useCallback(
    (e: IOrder) => {
      loading.show();
      ApiCall.getFile(`/orders/report/pdf/${e.id}`, "application/pdf")
        .then((data) => {
          const url = window.URL.createObjectURL(data);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `order/${e.id}.pdf`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        })
        .finally(() => {
          loading.hide();
        });
    },
    [loading]
  );

  const __ = (
    <Container>
      <StyledPageContainer>
        <StyledPageHeader>
          <h3>{t("common.orders")}</h3>
        </StyledPageHeader>
        <OrderListComponent
          setStatus={handleChangeStatus}
          status={status}
          setSortBy={setSortBy}
          setSortType={setSortType}
          orders={orders}
          elementCountOfPage={elementCountOfPage}
          setCustomer={handleChangeCustomer}
          setDate={handleChangeDate}
          handlePdfBtnClick={handlePdfBtnClick}
        />
      </StyledPageContainer>
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
