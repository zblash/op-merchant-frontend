import * as React from 'react';
import { UIContainer, UITableComponent, IObligationActivityResponse } from '@onlineplasiyer/op-web-fronted';
import { useGetAllObligationActivities } from '@/queries/paginated/use-get-all-obligation-activities';
import { Row, Col } from 'react-bootstrap';

/* ObligationsPage Helpers */
interface ObligationsPageProps {}
interface RouteParams {
  userId?: string;
}
/* ObligationsPage Constants */

/* ObligationsPage Styles */

/* ObligationsPage Component  */
function ObligationsPage(props: React.PropsWithChildren<ObligationsPageProps>) {
  /* ObligationsPage Variables */
  const [sortBy, setSortBy] = React.useState<string>();
  const [sortType, setSortType] = React.useState<string>();
  const [pageNumber, setPageNumber] = React.useState(1);

  const { data: obligationsValues, isLoading, error } = useGetAllObligationActivities({
    pageNumber,
    sortBy,
    sortType,
  });

  /* CreditActivities Callbacks */

  /* ObligationsPage Callbacks */

  /* ObligationsPage Lifecycle  */

  return (
    <UIContainer>
      {!isLoading && !error && (
        <Row>
          <Col xl={12} lg={12} sm={12} md={12}>
            <h3>Sistem Borclari</h3>
          </Col>
          <Col xl={12} lg={12} sm={12} md={12}>
            <UITableComponent
              columns={[
                {
                  Header: 'Belge No',
                  customRenderer: (item: IObligationActivityResponse) => item.id.slice(0, 10),
                  accessor: 'id',
                  sort: true,
                  sortType: 'desc',
                },
                {
                  Header: 'Tarih',
                  accessor: 'date',
                  sort: true,
                  sortType: 'desc',
                },
                {
                  Header: 'Islem Tipi',
                  accessor: 'obligationActivityType',
                  sort: true,
                  sortType: 'desc',
                },
                {
                  Header: 'Musteri',
                  accessor: 'customerName',
                },
                {
                  Header: 'Fatura Tutari',
                  accessor: 'orderTotalPrice',
                },
                {
                  Header: 'Komisyon Tutari',
                  accessor: 'orderCommissionPrice',
                },
                {
                  Header: 'Toplam Borc',
                  accessor: 'totalDebt',
                },
                {
                  Header: 'Toplam Bakiye',
                  accessor: 'totalReceivable',
                },
              ]}
              data={obligationsValues.values}
              currentPage={pageNumber}
              onPageChange={(gPageNumber: number) => {
                setPageNumber(gPageNumber);
              }}
              pagination
              showLastOrFirstPage
              showPageSize={7}
              totalPages={obligationsValues.totalPage}
              onSortChange={(e: string) => {
                setSortBy(e);
              }}
              onSortTypeChange={value => {
                setSortType(value);
              }}
            />
          </Col>
        </Row>
      )}
    </UIContainer>
  );
}
const PureObligationsPage = React.memo(ObligationsPage);

export { PureObligationsPage as ObligationsPage };
