import * as React from 'react';
import { UIContainer, UILink, UITableComponent } from '@/components/ui';
import { useGetAllUserCredits } from '@/queries/paginated/use-get-all-user-credits';
import { IUserCreditResponse } from '@/services/helpers/backend-models';
import { Row, Col } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';

/* MerchantCredits Helpers */
interface MerchantCreditsProps {}

/* MerchantCredits Constants */

/* MerchantCredits Styles */

/* MerchantCredits Component  */
function MerchantCredits(props: React.PropsWithChildren<MerchantCreditsProps>) {
  /* MerchantCredits Variables */

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
                    <UILink to={`/credit-activities/${item.customerId}`}>{item.customerName}</UILink>
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
                  customRenderer: (item: IUserCreditResponse) => <FaRegEdit color='color="#74b126"' size={16} />,
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
