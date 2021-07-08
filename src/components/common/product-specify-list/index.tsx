import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { colors, css } from '~/styled';
import { usePopupContext } from '~/contexts/popup/context';
import { ISpecifyProductResponse } from '~/services/helpers/backend-models';
import { UITableColumns } from '~/components/ui/table';
import { UIIcon, UITable, UILink } from '~/components/ui';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { refetchFactory } from '~/services/utils';

/* ProductSpecifyListComponent Helpers */
interface ProductSpecifyListComponentProps {
  userId?: string;
  productId?: string;
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
  const [allProductsPageNumber, setAllProductPageNumber] = React.useState(1);
  const [sortBy, setSortBy] = React.useState();
  const [sortType, setSortType] = React.useState();
  const { t } = useTranslation();
  const popupsContext = usePopupContext();

  const {
    data: { values: productSpecifiesValues, totalPage },
    getDataByPage: productSpecifiesPage,
  } = usePaginationQuery(
    props.productId
      ? paginationQueryEndpoints.getAllSpecifyProductsByProductId
      : paginationQueryEndpoints.getAllSpecifies,
    {
      variables: {
        productId: props.productId,
        userId: props.userId,
        sortBy,
        sortType,
      },
      pageNumber: allProductsPageNumber,
      defaultValue: { values: [], totalPage: 0 },
    },
  );
  const productSpecifies = React.useMemo(() => {
    return productSpecifiesPage(allProductsPageNumber);
  }, [allProductsPageNumber, productSpecifiesPage]);
  const refetchQuery = React.useMemo(
    () =>
      refetchFactory(paginationQueryEndpoints.getAllSpecifies, {
        userId: props.userId,
      }),
    [props.userId],
  );
  /* ProductSpecifyListComponent Callbacks */
  const onDeleteClick = React.useCallback(
    id => {
      popupsContext.deleteProductSpecify.show({
        id,
        refetchQuery,
      });
    },
    [popupsContext.deleteProductSpecify, refetchQuery],
  );
  const onChangePage = React.useCallback(
    (pageIndex: number, pageCount: number) => {
      if (allProductsPageNumber <= totalPage && pageIndex <= pageCount) {
        setAllProductPageNumber(pageIndex);
      }
    },
    [allProductsPageNumber, totalPage],
  );

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
              onClick={x => onDeleteClick(item.id)}
            />
            <StyledLink to={`/edit-product-specify/${item.id}`}>
              <UIIcon name="edit" color={colors.primaryDark} className={commonIconStyle} size={16} />
            </StyledLink>
          </StyledActionsWrapper>
        ),
      },
    ],
    [t, onDeleteClick],
  );

  return (
    <UITable
      onSortChange={e => setSortBy(e.value)}
      onSortTypeChange={value => setSortType(value)}
      id="all-product-specifies-page-table"
      data={productSpecifiesValues}
      rowCount={productSpecifies.elementCountOfPage > 0 ? productSpecifies.elementCountOfPage : 20}
      columns={TABLE_DATA_COLUMNS}
      totalPageCount={totalPage}
      onChangePage={onChangePage}
    />
  );
}
const PureProductSpecifyListComponent = React.memo(ProductSpecifyListComponent);

export { PureProductSpecifyListComponent as ProductSpecifyListComponent };
