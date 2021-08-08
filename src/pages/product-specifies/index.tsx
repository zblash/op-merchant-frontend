import * as React from 'react';
import styled, { colors, css } from '@/styled';
import { UIContainer, Loading } from '@/components/ui';
import { ProductSpecifyListComponent } from '@/components/page-components/product-specify-list';
import { useGetAllProductsByUser } from '@/queries/use-get-products-by-user';
import { useGetProductSpecifies } from '@/queries/paginated/use-get-product-specifies';
import { SpecifyDeletePopupComponent } from '@/components/page-components/specify-delete-popup';
import { useDeleteProductSpecify } from '@/queries/mutations/use-delete-product-specify';
import UISelect from '@/components/ui/ui-select';

/* ProductSpecifiesPage Helpers */
interface ProductSpecifiesPageProps {}
interface RouteParams {
  userId?: string;
}

/* ProductSpecifiesPage Constants */

/* ProductSpecifiesPage Styles */
const StyledPageContainer = styled.div``;
const StyledPageHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

/* ProductSpecifiesPage Component  */
function ProductSpecifiesPage(props: React.PropsWithChildren<ProductSpecifiesPageProps>) {
  /* ProductSpecifiesPage Variables */
  const [selectedProductId, setSelectedProducId] = React.useState<string>();
  const [selectedDeleteProductId, setSelectedDeleteProductId] = React.useState<string>();
  const [isDeletePopupShowing, setIsDeletePopupShowing] = React.useState<boolean>(false);
  const [productSpecifiesPageNumber, setProductSpecifiesPageNumber] = React.useState(1);
  const [sortBy, setSortBy] = React.useState<string>('id');
  const [sortType, setSortType] = React.useState<'asc' | 'desc'>('desc');

  const { mutate: deleteProductSpecify } = useDeleteProductSpecify();
  const { data: products, isLoading: productLoading } = useGetAllProductsByUser();
  const { data: productSpecifies, isLoading: productSpecifiesLoading, error } = useGetProductSpecifies({
    productId: selectedProductId,
    sortBy,
    sortType,
    pageNumber: productSpecifiesPageNumber,
  });

  /* ProductSpecifiesPage Callbacks */
  const onChangePage = React.useCallback((pageIndex: number) => {
    setProductSpecifiesPageNumber(pageIndex);
  }, []);

  const onDeleteSpecify = React.useCallback(
    (itemId: string) => {
      setIsDeletePopupShowing(false);
      deleteProductSpecify(itemId);
    },
    [deleteProductSpecify],
  );

  /* ProductSpecifiesPage Lifecycle  */

  return (
    <UIContainer>
      {!productSpecifiesLoading && !error && (
        <StyledPageContainer>
          <StyledPageHeader>
            <h3>Urunlerim</h3>
          </StyledPageHeader>
          {productLoading ? (
            <Loading color="currentColor" size={24} />
          ) : (
            <UISelect
              options={products.map(x => ({
                value: x.id,
                label: x.name,
              }))}
              labelKey="Urune Gore Listele"
              labelClassName="font-weight-bold"
              placeholderKey="Urune Gore Listele"
              className="w-45 mb-4 float-left"
              onChange={(e: { value: string; label: string }) => {
                setSelectedProducId(e.value);
              }}
              isSearchable
              isClearable
            />
          )}
          <ProductSpecifyListComponent
            productSpecifies={productSpecifies}
            onChangePage={onChangePage}
            sortObject={{ sortType, sortName: sortBy }}
            onSortByChanged={(e: string) => setSortBy(e)}
            onSortTypeChanged={e => setSortType(e)}
            onDelete={(id: string) => {
              setSelectedDeleteProductId(id);
              setIsDeletePopupShowing(true);
            }}
          />
          <SpecifyDeletePopupComponent
            isOpened={isDeletePopupShowing}
            specifyId={selectedDeleteProductId}
            onDeleteClicked={onDeleteSpecify}
            onShowingChanged={(showing: boolean) => setIsDeletePopupShowing(showing)}
          />
        </StyledPageContainer>
      )}
    </UIContainer>
  );
}
const PureProductSpecifiesPage = React.memo(ProductSpecifiesPage);

export { PureProductSpecifiesPage as ProductSpecifiesPage };
