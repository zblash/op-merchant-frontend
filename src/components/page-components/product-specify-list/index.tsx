import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@/styled';
import {
  IPaginationWrapper,
  ISpecifyProductResponse,
  UITableComponent,
  UILink,
  UIEditIcon,
  UITrashIcon,
} from '@onlineplasiyer/op-web-fronted';
import { DeleteProductSpecifyPopupComponent } from './delete-product-specify-popup';

/* ProductSpecifyListComponent Helpers */
interface ProductSpecifyListComponentProps {
  productSpecifies: IPaginationWrapper<ISpecifyProductResponse>;
  onSortTypeChanged: (sortType: 'asc' | 'desc') => void;
  onSortByChanged: (sortBy: string) => void;
  onChangePage: (pageIndex: number) => void;
  onDelete: (itemId: string) => void;
  sortObject?: { sortName: string; sortType: 'asc' | 'desc' };
}

/* ProductSpecifyListComponent Constants */

/* ProductSpecifyListComponent Styles */
const StyledActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* ProductSpecifyListComponent Component  */
function ProductSpecifyListComponent(props: React.PropsWithChildren<ProductSpecifyListComponentProps>) {
  /* ProductSpecifyListComponent Variables */
  const { t } = useTranslation();
  const [isDeletePopupShowing, setDeletePopupShowing] = React.useState(false);
  const [selectedProductSpecifyForDelete, setSelectedProductSpecifyForDelete] = React.useState<
    ISpecifyProductResponse
  >();
  /* ProductSpecifyListComponent Callbacks */

  /* ProductSpecifyListComponent Lifecycle  */

  return (
    <>
      <UITableComponent
        columns={[
          {
            Header: t('common.barcode'),
            accessor: 'barcode',
            sort: true,
            sortName: 'id',
            sortType: props.sortObject && props.sortObject.sortName === 'id' ? props.sortObject.sortType : 'desc',
            customRenderer: (item: ISpecifyProductResponse) => item.productBarcodeList[0],
          },
          {
            Header: t('common.product-name'),
            accessor: 'productName',
          },
          {
            Header: t('common.stock'),
            accessor: 'quantity',
          },
          {
            Header: t('common.contents'),
            accessor: 'contents',
          },
          {
            Header: t('common.recommended-sales-price'),
            accessor: 'recommendedRetailPrice',
          },
          {
            Header: t('common.total-price'),
            accessor: 'totalPrice',
          },
          {
            Header: t('common.unit-price'),
            accessor: 'unitPrice',
          },
          {
            Header: t('common.unit-type'),
            accessor: 'unitType',
          },
          {
            Header: t('common.active-states'),
            accessor: 'active-states',
            customRenderer: (item: ISpecifyProductResponse) =>
              item.states.map(x => `${x.cityTitle} - ${x.title}`).join(','),
          },

          {
            Header: '',
            accessor: 'operations',
            customRenderer: (item: ISpecifyProductResponse) => (
              <StyledActionsWrapper>
                <UITrashIcon
                  color="#842029"
                  className="mr-3 cursor-pointer"
                  size={16}
                  onClick={() => {
                    setDeletePopupShowing(true);
                    setSelectedProductSpecifyForDelete(item);
                  }}
                />

                <UILink to={`/edit-product-specify/${item.id}`}>
                  <UIEditIcon color="#74b126" size={16} />
                </UILink>
              </StyledActionsWrapper>
            ),
          },
        ]}
        data={props.productSpecifies.values}
        currentPage={props.productSpecifies.pageNumber}
        onPageChange={props.onChangePage}
        pagination
        showLastOrFirstPage
        showPageSize={7}
        totalPages={props.productSpecifies.totalPage}
        onSortChange={props.onSortByChanged}
        onSortTypeChange={value => props.onSortTypeChanged(value)}
      />
      <DeleteProductSpecifyPopupComponent
        isOpened={isDeletePopupShowing}
        productSpecify={selectedProductSpecifyForDelete}
        onAccept={(itemId: string) => {
          props.onDelete(itemId);
          setDeletePopupShowing(false);
        }}
        onShowingChanged={(showing: boolean) => {
          setDeletePopupShowing(showing);
        }}
      />
    </>
  );
}
const PureProductSpecifyListComponent = React.memo(ProductSpecifyListComponent);

export { PureProductSpecifyListComponent as ProductSpecifyListComponent };
