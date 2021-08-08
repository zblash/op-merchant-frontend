import * as React from 'react';
import styled, { colors, css } from '@/styled';
import { usePopupContext } from '@/contexts/popup/context';
import { UIIcon, UIContainer, UILink, UITableComponent } from '@/components/ui';
import { useGetAllUserCredits } from '@/queries/paginated/use-get-all-user-credits';
import { IUserCreditResponse } from '@/services/helpers/backend-models';
import { Row, Col } from 'react-bootstrap';

/* MerchantCredits Helpers */
interface MerchantCreditsProps {}

/* MerchantCredits Constants */

/* MerchantCredits Styles */
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
  const [sortBy, setSortBy] = React.useState<string>();
  const [sortType, setSortType] = React.useState<string>();
  const [username, setUsername] = React.useState<string>();
  const [pageNumber, setPageNumber] = React.useState(1);

  const { data: creditsValues, isLoading, error } = useGetAllUserCredits({
    pageNumber,
    sortBy,
    sortType,
    userName: username,
  });

  /* MerchantCredits Callbacks */

  /* MerchantCredits Lifecycle  */

  return (
    <UIContainer>
      {!isLoading && !error && (
        <Row>
          <Col xl={12} lg={12} sm={12} md={12}>
            <h3>Krediler</h3>
          </Col>
          <Col xl={12} lg={12} sm={12} md={12}>
            <UITableComponent
              columns={[
                {
                  Header: 'Musteri No',
                  customRenderer: (item: IUserCreditResponse) => item.customerId.slice(0, 10),
                  accessor: 'customerId',
                  sort: true,
                  sortType: 'desc',
                },
                {
                  Header: 'Musteri',
                  accessor: 'customerName',
                  sort: true,
                  sortType: 'desc',
                  customRenderer: (item: IUserCreditResponse) => (
                    <StyledLink to={`/credit-activities/${item.customerId}`}>{item.customerName}</StyledLink>
                  ),
                },
                {
                  Header: 'Toplam Borc',
                  accessor: 'totalDebt',
                  sort: true,
                  sortType: 'desc',
                },
                {
                  Header: 'Kredi Limiti',
                  accessor: 'creditLimit',
                  sort: true,
                  sortType: 'desc',
                },
                {
                  Header: '',
                  accessor: 'operations',
                  customRenderer: (item: IUserCreditResponse) => (
                    <UIIcon
                      name="edit"
                      color={colors.primaryDark}
                      className={commonIconStyle}
                      size={16}
                      onClick={() => {
                        popupsContext.editCredit.show({ credit: item });
                      }}
                    />
                  ),
                },
              ]}
              data={creditsValues.values}
              currentPage={pageNumber}
              onPageChange={(gPageNumber: number) => {
                setPageNumber(gPageNumber);
              }}
              pagination
              showLastOrFirstPage
              showPageSize={7}
              totalPages={creditsValues.elementCountOfPage}
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
const PureMerchantCredits = React.memo(MerchantCredits);

export { PureMerchantCredits as MerchantCredits };
