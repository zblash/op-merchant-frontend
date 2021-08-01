import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { colors, css } from '@/styled';
import { UIIcon, UILink } from '@/components/ui';
import { IPaginationWrapper, ISpecifyProductResponse } from '@/utils/api/api-models';
import { UITableComponent } from '@/components/ui/table/index';

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
const StyledLink = styled(UILink)``;
const commonIconStyle = css`
  cursor: pointer;
  margin: 0 8px;
`;
/* ProductSpecifyListComponent Component  */
function ProductSpecifyListComponent(props: React.PropsWithChildren<ProductSpecifyListComponentProps>) {
  /* ProductSpecifyListComponent Variables */
  const { t } = useTranslation();
  /* ProductSpecifyListComponent Callbacks */

  /* ProductSpecifyListComponent Lifecycle  */

  return (
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
              <UIIcon
                name="trash"
                color={colors.dangerDark}
                className={commonIconStyle}
                size={16}
                onClick={x => props.onDelete(item.id)}
              />
              <StyledLink to={`/edit-product-specify/${item.id}`}>
                <UIIcon name="edit" color={colors.primaryDark} className={commonIconStyle} size={16} />
              </StyledLink>
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
  );
}
const PureProductSpecifyListComponent = React.memo(ProductSpecifyListComponent);

export { PureProductSpecifyListComponent as ProductSpecifyListComponent };
