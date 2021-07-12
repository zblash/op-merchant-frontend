/* eslint-disable dot-notation */
import * as React from 'react';
import { useParams, useLocation } from 'react-router';
import styled from '@/styled';
import { Container, UITable } from '@/components/ui';
import { CreditActivitiesFilterComponent } from './filter';
import { twoDigit } from '@/utils';
import { useGetAllUsersCreditActivities } from '@/queries/paginated/use-get-all-users-credit-activities';

/* CreditActivities Helpers */
interface CreditActivitiesProps {}
interface RouteParams {
  creditId?: string;
}
/* CreditActivities Constants */

/* CreditActivities Styles */
const StyledPageContainer = styled.div``;
const StyledPageHeader = styled.div`
  display: flex;
`;

/* CreditActivities Component  */
function CreditActivities(props: React.PropsWithChildren<CreditActivitiesProps>) {
  /* CreditActivities Variables */
  const locationState = useLocation().state;
  const [activityType, setActivityType] = React.useState(
    locationState && locationState['activityType'] ? locationState['activityType'] : undefined,
  );
  const { creditId } = useParams<RouteParams>();

  const [sortBy, setSortBy] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [lastDate, setLastDate] = React.useState<string>();
  const [startDate, setStartDate] = React.useState<string>();
  const [allCreditActivityPageNumber, setAllCreditActivityPageNumber] = React.useState(1);

  const { data: creditsValues, isLoading, error } = useGetAllUsersCreditActivities({
    sortBy,
    sortType,
    startDate,
    lastDate,
    userId: creditId,
    activityType,
    pageNumber: allCreditActivityPageNumber,
  });

  const TABLE_DATA_COLUMNS = [
    {
      title: 'No',
      itemRenderer: item => item.id.slice(0, 10),
      itemSortName: 'id',
    },
    {
      title: 'Musteri',
      itemRenderer: item => item.customerName,
    },
    {
      title: 'Belge No',
      itemRenderer: item => item.documentNo,
    },

    {
      title: 'Tarih',
      itemRenderer: item => item.date,
      itemSortName: 'date',
    },
    {
      title: 'Islem Tipi',
      itemRenderer: item => item.activityType,
    },
    {
      title: 'Odeme Yontemi',
      itemRenderer: item => item.paymentType,
    },
    {
      title: 'Fatura Tutari',
      itemRenderer: item => item.price,
      itemSortName: 'priceValue',
    },
    {
      title: 'Odenen Tutar',
      itemRenderer: item => item.paidPrice,
    },
    {
      title: 'Kalan Borc',
      itemRenderer: item => item.currentDebt,
    },
  ];

  /* CreditActivities Callbacks */
  const onChangePage = React.useCallback(
    (pageIndex: number, pageCount: number) => {
      if (allCreditActivityPageNumber <= creditsValues.totalPage && pageIndex <= pageCount) {
        setAllCreditActivityPageNumber(pageIndex);
      }
    },
    [allCreditActivityPageNumber, creditsValues.totalPage],
  );

  const handleLastDateFilterChange = React.useCallback((e: Date) => {
    setLastDate(`${twoDigit(e.getDate())}-${twoDigit(e.getMonth() + 1)}-${e.getFullYear()}`);
  }, []);
  const handleStartDateFilterChange = React.useCallback((e: Date) => {
    setStartDate(`${twoDigit(e.getDate())}-${twoDigit(e.getMonth() + 1)}-${e.getFullYear()}`);
  }, []);

  /* CreditActivities Lifecycle  */

  return (
    <Container>
      {!isLoading && !error && (
        <StyledPageContainer>
          <StyledPageHeader>
            <h3>Cari Ekstralar</h3>
          </StyledPageHeader>
          <CreditActivitiesFilterComponent
            setLastDate={handleLastDateFilterChange}
            setStartDate={handleStartDateFilterChange}
          />
          <UITable
            id="credit-activities-page-table"
            onSortChange={e => setSortBy(e.value)}
            onSortTypeChange={value => setSortType(value)}
            data={creditsValues.values}
            rowCount={creditsValues.elementCountOfPage > 0 ? creditsValues.elementCountOfPage : 15}
            columns={TABLE_DATA_COLUMNS}
            totalPageCount={creditsValues.totalPage}
            onChangePage={onChangePage}
          />
        </StyledPageContainer>
      )}
    </Container>
  );
}
const PureCreditActivities = React.memo(CreditActivities);

export { PureCreditActivities as CreditActivities };
