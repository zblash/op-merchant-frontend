import * as React from 'react';
import styled, { colors, css } from '@/styled';
import { usePopupContext } from '@/contexts/popup/context';
import { UIIcon, Container, UITable, UILink } from '@/components/ui';
import { useGetAllUserCredits } from '@/queries/paginated/use-get-all-user-credits';

/* MerchantCredits Helpers */
interface MerchantCreditsProps {}

/* MerchantCredits Constants */

/* MerchantCredits Styles */
const StyledPageContainer = styled.div`
  margin-top: 48px;
`;
const StyledActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledPageHeader = styled.div`
  display: flex;
`;
const StyledLink = styled(UILink)`
  color: ${colors.primary};
`;
const commonIconStyle = css`
  cursor: pointer;
  margin: 0 8px;
`;

/* MerchantCredits Component  */
function MerchantCredits(props: React.PropsWithChildren<MerchantCreditsProps>) {
  /* MerchantCredits Variables */

  const popupsContext = usePopupContext();
  const [sortBy, setSortBy] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [username, setUsername] = React.useState<string>();
  const [allCreditsPageNumber, setAllCreditsPageNumber] = React.useState(1);

  const { data: creditsValues, isLoading, error } = useGetAllUserCredits({
    pageNumber: allCreditsPageNumber,
    sortBy,
    sortType,
    userName: username,
  });

  const TABLE_DATA_COLUMNS = React.useMemo(() => {
    const table = [
      {
        title: 'Musteri No',
        itemRenderer: item => item.id.slice(0, 10),
        itemSortName: 'id',
      },
      {
        title: 'Musteri',
        itemRenderer: item => <StyledLink to={`/credit-activities/${item.customerId}`}>{item.customerName}</StyledLink>,
      },
      {
        title: 'Toplam Borc',
        itemRenderer: item => item.totalDebt,
        itemSortName: 'totalDebt',
      },
      {
        title: 'Kredi Limiti',
        itemRenderer: item => item.creditLimit,
        itemSortName: 'creditLimit',
      },
    ];
    table.push({
      title: null,
      itemRenderer: item => (
        <StyledActionsWrapper>
          <UIIcon
            name="edit"
            color={colors.primaryDark}
            className={commonIconStyle}
            size={16}
            onClick={() => {
              popupsContext.editCredit.show({ credit: item });
            }}
          />
        </StyledActionsWrapper>
      ),
    });

    return table;
  }, [popupsContext]);
  /* MerchantCredits Callbacks */
  const onChangePage = React.useCallback(
    (pageIndex: number, pageCount: number) => {
      if (allCreditsPageNumber <= creditsValues.totalPage && pageIndex <= pageCount) {
        setAllCreditsPageNumber(pageIndex);
      }
    },
    [allCreditsPageNumber, creditsValues.totalPage],
  );
  /* MerchantCredits Lifecycle  */

  return (
    <Container>
      {!isLoading && !error && (
        <StyledPageContainer>
          <StyledPageHeader>
            <h3>Krediler</h3>
          </StyledPageHeader>
          <UITable
            onSortChange={e => setSortBy(e.value)}
            onSortTypeChange={value => setSortType(value)}
            id="merchant-credits-page-table"
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
const PureMerchantCredits = React.memo(MerchantCredits);

export { PureMerchantCredits as MerchantCredits };
