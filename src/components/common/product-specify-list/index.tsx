import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { colors, css } from '@/styled';
import { UITableColumns } from '@/components/ui/table';
import { UIIcon, UITable, UILink } from '@/components/ui';
import { IPaginationWrapper, ISpecifyProductResponse } from '@/utils/api/api-models';

/* ProductSpecifyListComponent Helpers */
interface ProductSpecifyListComponentProps {
  productSpecifies: IPaginationWrapper<ISpecifyProductResponse>;
  onSortTypeChanged: (sortType: string) => void;
  onSortByChanged: (sortBy: string) => void;
  onChangePage: (pageIndex: number, pageCount: number) => void;
  onDelete: (itemId: string) => void;
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
  const TABLE_DATA_COLUMNS = React.useMemo<UITableColumns<ISpecifyProductResponse>[]>(
    () => [
      {
        title: t('common.barcode'),
        itemRenderer: item => (
          <p>
            {item.productBarcodeList.map(productBarcode => (
              <span>
                {productBarcode}
                <br />
              </span>
            ))}
          </p>
        ),
        itemSortName: 'id',
      },
      {
        title: t('common.product-name'),
        itemRenderer: item => item.productName,
      },
      {
        title: t('common.stock'),
        itemRenderer: item => item.quantity,
      },
      {
        title: t('common.contents'),
        itemRenderer: item => item.contents,
      },
      {
        title: t('common.recommended-sales-price'),
        itemRenderer: item => item.recommendedRetailPrice,
      },
      {
        title: t('common.total-price'),
        itemRenderer: item => item.totalPrice,
        itemSortName: 'totalPrice',
      },
      {
        title: t('common.unit-price'),
        itemRenderer: item => item.unitPrice,
        itemSortName: 'unitPrice',
      },
      {
        title: t('common.unit-type'),
        itemRenderer: item => item.unitType,
      },
      {
        title: t('common.active-states'),
        itemRenderer: item => item.states.map(x => `${x.cityTitle} - ${x.title}`).join(','),
      },
      {
        title: null,
        itemRenderer: item => (
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
    ],
    [t, props],
  );

  return (
    <UITable
      onSortChange={e => props.onSortByChanged(e.value)}
      onSortTypeChange={value => props.onSortTypeChanged(value)}
      id="all-product-specifies-page-table"
      data={props.productSpecifies.values}
      rowCount={props.productSpecifies.elementCountOfPage > 0 ? props.productSpecifies.elementCountOfPage : 20}
      columns={TABLE_DATA_COLUMNS}
      totalPageCount={props.productSpecifies.totalPage}
      onChangePage={props.onChangePage}
    />
  );
}
const PureProductSpecifyListComponent = React.memo(ProductSpecifyListComponent);

export { PureProductSpecifyListComponent as ProductSpecifyListComponent };
