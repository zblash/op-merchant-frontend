import * as React from "react";
import styled, { colors, css } from "~/styled";
import { usePopupContext } from "~/contexts/popup/context";
import { usePaginationQuery } from "~/services/query-context/use-pagination-quey";
import { paginationQueryEndpoints } from "~/services/query-context/pagination-query-endpoints";
import { refetchFactory } from "~/services/utils";
import { UIIcon, Container, UITable, UILink } from "~/components/ui";

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
  const {
    data: { values: creditsValues, totalPage },
    getDataByPage: creditsByPage,
  } = usePaginationQuery(paginationQueryEndpoints.getAllUserCredits, {
    pageNumber: allCreditsPageNumber,
    variables: {
      sortBy,
      sortType,
      userName: username,
    },
    defaultValue: { values: [], totalPage: 0 },
  });
  const refetchQuery = refetchFactory(
    paginationQueryEndpoints.getAllUserCredits
  );
  const credits = React.useMemo(() => {
    return creditsByPage(allCreditsPageNumber);
  }, [creditsByPage, allCreditsPageNumber]);
  const TABLE_DATA_COLUMNS = React.useMemo(() => {
    const table = [
      {
        title: "Musteri No",
        itemRenderer: (item) => item.id.slice(0, 10),
        itemSortName: "id",
      },
      {
        title: "Musteri",
        itemRenderer: (item) => (
          <StyledLink to={`/credit-activities/${item.customerId}`}>
            {item.customerName}
          </StyledLink>
        ),
      },
      {
        title: "Toplam Borc",
        itemRenderer: (item) => item.totalDebt,
        itemSortName: "totalDebt",
      },
      {
        title: "Kredi Limiti",
        itemRenderer: (item) => item.creditLimit,
        itemSortName: "creditLimit",
      },
    ];
    table.push({
      title: null,
      itemRenderer: (item) => (
        <StyledActionsWrapper>
          <UIIcon
            name="edit"
            color={colors.primaryDark}
            className={commonIconStyle}
            size={16}
            onClick={() => {
              popupsContext.editCredit.show({ credit: item, refetchQuery });
            }}
          />
        </StyledActionsWrapper>
      ),
    });

    return table;
  }, [popupsContext, refetchQuery]);
  /* MerchantCredits Callbacks */
  const onChangePage = React.useCallback(
    (pageIndex: number, pageCount: number) => {
      if (allCreditsPageNumber <= totalPage && pageIndex <= pageCount) {
        setAllCreditsPageNumber(pageIndex);
      }
    },
    [allCreditsPageNumber, totalPage]
  );
  /* MerchantCredits Lifecycle  */

  return (
    <Container>
      <StyledPageContainer>
        <StyledPageHeader>
          <h3>Krediler</h3>
        </StyledPageHeader>
        <UITable
          onSortChange={(e) => setSortBy(e.value)}
          onSortTypeChange={(value) => setSortType(value)}
          id="merchant-credits-page-table"
          data={creditsValues}
          rowCount={
            credits.elementCountOfPage > 0 ? credits.elementCountOfPage : 15
          }
          columns={TABLE_DATA_COLUMNS}
          totalPageCount={totalPage}
          onChangePage={onChangePage}
        />
      </StyledPageContainer>
    </Container>
  );
}
const PureMerchantCredits = React.memo(MerchantCredits);

export { PureMerchantCredits as MerchantCredits };
