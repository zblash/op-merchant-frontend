import * as React from 'react';
import { useHistory } from 'react-router';
import { Container } from '@/components/ui';
import { ISpecifyProductRequest, IProductRequest, IProductResponse, IExceptionResponse } from '@/utils/api/api-models';
import { useAlert } from '@/utils/hooks';
import { ProductFormComponent } from '@/components/common/product-form';
import { ProductSpecifyFormComponent } from '@/components/common/product-specify-form';
import { useGetProductByBarcode } from '@/queries/use-get-product-by-barcode';
import { useGetCategories } from '@/queries/use-get-categories';
import { useGetSubCategoriesByParent } from '@/queries/use-get-sub-categories-by-parent';
import { useHasProduct } from '@/queries/mutations/use-has-product';
import { useCreateProductSpecify } from '@/queries/mutations/use-create-product-specify';
import { useCreateProduct } from '@/queries/mutations/use-create-product';
import { useGetCustomerTypes } from '@/queries/use-get-customer-types';
import { useAuth } from '@/contexts/auth-context';

/* CreateProductSpecifyPage Helpers */
interface CreateProductSpecifyPageProps {}

/* CreateProductSpecifyPage Constants */

/* CreateProductSpecifyPage Styles */

/* CreateProductSpecifyPage Component  */
function CreateProductSpecifyPage(props: React.PropsWithChildren<CreateProductSpecifyPageProps>) {
  /* CreateProductSpecifyPage Variables */
  const alertContext = useAlert();
  const routerHistory = useHistory();
  const { userDetails } = useAuth();

  const [isProductComponent, setIsProductComponent] = React.useState<boolean>(true);
  const [isBarcodeSaved, setBarcodeSaved] = React.useState<boolean>(true);
  const [skipProduct, setSkipProduct] = React.useState<boolean>(true);
  const [barcode, setBarcode] = React.useState<string>();
  const [product, setProduct] = React.useState<IProductResponse>();
  const [selectedParentCategory, setSelectedParentCategory] = React.useState<string | undefined>(undefined);

  const { data: customerTypes, isLoading: customerTypesLoading } = useGetCustomerTypes();
  const { data: productQuery, isLoading: productLoading } = useGetProductByBarcode(
    barcode,
    !skipProduct && isProductComponent,
  );

  const { data: parentCategories, isLoading: categoriesLoading } = useGetCategories(
    { type: 'parent' },
    !isBarcodeSaved && isProductComponent,
  );

  const { data: subCategories } = useGetSubCategoriesByParent(
    selectedParentCategory,
    selectedParentCategory !== undefined && isProductComponent,
  );

  const { mutateAsync: checkProduct } = useHasProduct();

  const { mutateAsync: createProductSpecify } = useCreateProductSpecify();

  const { mutateAsync: createProduct } = useCreateProduct();

  const handleSpecifySubmit = React.useCallback(
    (request: ISpecifyProductRequest) => {
      createProductSpecify(request)
        .then(() => {
          alertContext.show('Urun Basariyla Eklendi', { type: 'success' });
          routerHistory.push('/product-specifies');
        })
        .catch(() => {
          alertContext.show('Lutfen Tum Alanlari Doldurun', { type: 'error' });
        });
    },
    [alertContext, createProductSpecify, routerHistory],
  );

  const handleBarcodeSubmit = React.useCallback(
    (_barcode: string) => {
      checkProduct(_barcode)
        .then(hasBarcode => {
          setBarcodeSaved(hasBarcode);
          setBarcode(_barcode);
          setSkipProduct(!hasBarcode);
          setIsProductComponent(!hasBarcode);

          if (hasBarcode) {
            alertContext.show('Urun sistemde bulundu. Devam Edebilirsiniz', {
              type: 'success',
            });
          } else {
            alertContext.show('Urun sistemde bulunamadi. Lutfen bilgileri doldurup devam edin', { type: 'success' });
          }
        })
        .catch((e: IExceptionResponse) => {
          alertContext.show(`Urun sorgulamasinda bir hata olustu tekrar deneyin. ${e.message}`, { type: 'error' });
        });
    },
    [alertContext, checkProduct],
  );

  const handleProductSubmit = React.useCallback(
    (request: IProductRequest) => {
      createProduct(request)
        .then(data => {
          setProduct(data);
          setIsProductComponent(false);
        })
        .catch(e => {
          alertContext.show(`Urun eklerken bir hata olustu tekrar deneyin. ${e}`, { type: 'error' });
        });
    },
    [alertContext, createProduct],
  );

  return (
    <Container>
      {!categoriesLoading && !customerTypesLoading && !productLoading && (
        <>
          {isProductComponent && (
            <ProductFormComponent
              barcode={barcode}
              onBarcodeSubmit={handleBarcodeSubmit}
              isBarcodeSaved={isBarcodeSaved}
              onProductSubmit={handleProductSubmit}
              product={product || productQuery}
              parentCategories={parentCategories}
              subCategories={subCategories}
              customerTypes={customerTypes}
              onParentCategoryChanged={(parentCat: string) => {
                setSelectedParentCategory(parentCat);
              }}
            />
          )}
          {!isProductComponent && (productQuery || product) && (
            <ProductSpecifyFormComponent
              barcode={barcode}
              activeStates={userDetails.activeStates}
              onSubmit={handleSpecifySubmit}
              customerTypes={productQuery ? productQuery.customerTypeList : product.customerTypeList}
            />
          )}
        </>
      )}
    </Container>
  );
}
const PureCreateProductSpecifyPage = React.memo(CreateProductSpecifyPage);

export { PureCreateProductSpecifyPage as CreateProductSpecifyPage };
