import * as React from 'react';
import styled from '@/styled';
import { UIContainer, Loading, UISelect } from '@zblash/op-web-fronted';
import { ProductSpecifyListComponent } from '@/components/page-components/product-specify-list';
import { useGetAllProductsByUser } from '@/queries/use-get-products-by-user';
import { useGetProductSpecifies } from '@/queries/paginated/use-get-product-specifies';
import { useDeleteProductSpecify } from '@/queries/mutations/use-delete-product-specify';
/* ProductSpecifiesPage Helpers */
interface ProductSpecifiesPageProps {}

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
              onDeleteSpecify(id);
            }}
          />
        </StyledPageContainer>
      )}
    </UIContainer>
  );
}
const PureProductSpecifiesPage = React.memo(ProductSpecifiesPage);

export { PureProductSpecifiesPage as ProductSpecifiesPage };
