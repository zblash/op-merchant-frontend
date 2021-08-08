import * as React from 'react';
import { useHistory } from 'react-router';
import { UIContainer } from '@/components/ui';
import { Row, Col, Button } from 'react-bootstrap';
import { UITableComponent } from '@/components/ui/table/index';
import { IUserCommonResponse } from '@/utils/api/api-models';
import { useGetAllCustomers } from '@/queries/paginated/use-get-all-users';

/* CustomersPage Helpers */
interface CustomersPageProps {}

/* CustomersPage Constants */

/* CustomersPage Component  */
function CustomersPage(props: React.PropsWithChildren<CustomersPageProps>) {
  /* CustomersPage Variables */
  const routerHistory = useHistory();
  const [sortBy, setSortBy] = React.useState<string>('');
  const [sortType, setSortType] = React.useState<string>('');
  const [pageNumber, setPageNumber] = React.useState(1);
  const { data: users, isLoading, error } = useGetAllCustomers({
    pageNumber,
    sortBy,
    sortType,
  });
  /* CustomersPage Callbacks */
  const handleUser = React.useCallback(
    (username: string, id: string) => {
      routerHistory.push(`/merchant/customer/${username}/${id}`);
    },
    [routerHistory],
  );
  /* CustomersPage Lifecycle  */

  return (
    <UIContainer>
      {!isLoading && !error && (
        <Row>
          <Col xl={12} lg={12} sm={12} md={12}>
            <h3>Kayitli Musteriler</h3>
          </Col>
          <Col xl={12} lg={12} sm={12} md={12}>
            <UITableComponent
              columns={[
                {
                  Header: 'Kullanici Adi',
                  accessor: 'username',
                  sort: true,
                  sortType: 'desc',
                  customRenderer: (item: IUserCommonResponse) => (
                    <Button className="p-0" variant="link" onClick={() => handleUser(item.username, item.id)}>
                      {item.username}
                    </Button>
                  ),
                },
                {
                  Header: 'Isim',
                  accessor: 'name',
                  sort: true,
                  sortType: 'desc',
                },
                {
                  Header: 'Mail Adresi',
                  accessor: 'email',
                },
              ]}
              data={users.values}
              currentPage={pageNumber}
              onPageChange={(gPageNumber: number) => {
                setPageNumber(gPageNumber);
              }}
              pagination
              showLastOrFirstPage
              showPageSize={7}
              totalPages={users.elementCountOfPage}
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
const PureCustomersPage = React.memo(CustomersPage);

export { PureCustomersPage as CustomersPage };
