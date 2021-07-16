import * as React from 'react';
import styled from '@/styled';
import { Container, UITable } from '@/components/ui';
import { UITableColumns } from '@/components/ui/table';
import { IObligationActivityResponse } from '@/services/helpers/backend-models';
import { useGetAllObligationActivities } from '@/queries/paginated/use-get-all-obligation-activities';

/* ObligationsPage Helpers */
interface ObligationsPageProps {}
interface RouteParams {
  userId?: string;
}
/* ObligationsPage Constants */

/* ObligationsPage Styles */
const StyledPageContainer = styled.div``;
const StyledPageHeader = styled.div`
  display: flex;
`;

/* ObligationsPage Component  */
function ObligationsPage(props: React.PropsWithChildren<ObligationsPageProps>) {
  /* ObligationsPage Variables */
  const [sortBy, setSortBy] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [allObligationsPageNumber, setAllObligationsPageNumber] = React.useState(1);

  const { data: obligationsValues, isLoading, error } = useGetAllObligationActivities({
    pageNumber: allObligationsPageNumber,
    sortBy,
    sortType,
  });

  const TABLE_DATA_COLUMNS = React.useMemo<UITableColumns<IObligationActivityResponse>[]>(() => {
    return [
      {
        title: 'Belge No',
        itemRenderer: item => item.documentNo,
        itemSortName: 'id',
      },
      {
        title: 'Tarih',
        itemRenderer: item => <p>{item.date}</p>,
        itemSortName: 'date',
      },
      {
        title: 'Islem Tipi',
        itemRenderer: item => item.obligationActivityType,
      },
      {
        title: 'Musteri',
        itemRenderer: item => item.customerName,
      },
      {
        title: 'Fatura Tutari',
        itemRenderer: item => item.orderTotalPrice,
        itemSortName: 'priceValue',
      },
      {
        title: 'Komisyon Tutari',
        itemRenderer: item => item.orderCommissionPrice,
      },
      {
        title: 'Toplam Borc',
        itemRenderer: item => item.totalDebt,
      },
      {
        title: 'Toplam Bakiye',
        itemRenderer: item => item.totalReceivable,
      },
    ];
  }, []);

  /* CreditActivities Callbacks */
  const onChangePage = React.useCallback(
    (pageIndex: number, pageCount: number) => {
      if (allObligationsPageNumber <= obligationsValues.totalPage && pageIndex <= pageCount) {
        setAllObligationsPageNumber(pageIndex);
      }
    },
    [allObligationsPageNumber, obligationsValues],
  );
  /* ObligationsPage Callbacks */

  /* ObligationsPage Lifecycle  */

  return (
    <Container>
      {!isLoading && !error && (
        <StyledPageContainer>
          <StyledPageHeader>
            <h3>Sistem Borclari</h3>
          </StyledPageHeader>
          <UITable
            id="obligations-page-table"
            onSortChange={e => setSortBy(e.value)}
            onSortTypeChange={value => setSortType(value)}
            data={obligationsValues.values}
            rowCount={obligationsValues.elementCountOfPage > 0 ? obligationsValues.elementCountOfPage : 5}
            columns={TABLE_DATA_COLUMNS}
            totalPageCount={obligationsValues.totalPage}
            onChangePage={onChangePage}
          />
        </StyledPageContainer>
      )}
    </Container>
  );
}
const PureObligationsPage = React.memo(ObligationsPage);

export { PureObligationsPage as ObligationsPage };
