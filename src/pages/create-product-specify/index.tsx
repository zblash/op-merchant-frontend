import * as React from 'react';
import { useHistory } from 'react-router';
import { Container } from '@/components/ui';
import { mutationEndPoints } from '@/services/mutation-context/mutation-enpoints';
import { useMutation } from '@/services/mutation-context/context';
import { refetchFactory } from '@/services/utils';
import { paginationQueryEndpoints } from '@/services/query-context/pagination-query-endpoints';
import { ISpecifyProductRequest, IProductRequest, IProductResponse } from '@/services/helpers/backend-models';
import { useAlert } from '@/utils/hooks';
import { useQuery } from '@/services/query-context/context';
import { queryEndpoints } from '@/services/query-context/query-endpoints';
import { useApplicationContext } from '@/app/context';
import { ProductFormComponent } from '@/components/common/product-form';
import { ProductSpecifyFormComponent } from '@/components/common/product-specify-form';
import { useLoadingContext } from '@/contexts/loading-context';

/* CreateProductSpecifyPage Helpers */
interface CreateProductSpecifyPageProps {}

/* CreateProductSpecifyPage Constants */

/* CreateProductSpecifyPage Styles */

/* CreateProductSpecifyPage Component  */
function CreateProductSpecifyPage(props: React.PropsWithChildren<CreateProductSpecifyPageProps>) {
  /* CreateProductSpecifyPage Variables */
  const alertContext = useAlert();
  const routerHistory = useHistory();
  const applicationContext = useApplicationContext();
  const loading = useLoadingContext();

  const [isProductComponent, setIsProductComponent] = React.useState<boolean>(true);
  const [isBarcodeSaved, setBarcodeSaved] = React.useState<boolean>(true);
  const [skipProduct, setSkipProduct] = React.useState<boolean>(true);
  const [barcode, setBarcode] = React.useState<string>();
  const [product, setProduct] = React.useState<IProductResponse>();

  const { data: productQuery } = useQuery(queryEndpoints.getProductByBarcode, {
    defaultValue: {},
    variables: { barcode },
    skip: skipProduct,
  });

  const { mutation: createProductSpecify } = useMutation(mutationEndPoints.createSpecifyProductForAuthUser, {
    refetchQueries: [refetchFactory(paginationQueryEndpoints.getAllSpecifies)],
  });

  const { mutation: checkProduct } = useMutation(mutationEndPoints.hasProduct);

  const { mutation: createProduct } = useMutation(mutationEndPoints.createProduct, {
    refetchQueries: [],
  });

  const handleSpecifySubmit = React.useCallback(
    (request: ISpecifyProductRequest) => {
      loading.show();
      createProductSpecify(request)
        .then(() => {
          alertContext.show('Urun Basariyla Eklendi', { type: 'success' });
          routerHistory.push('/product-specifies');
        })
        .catch(() => {
          alertContext.show('Lutfen Tum Alanlari Doldurun', { type: 'error' });
        })
        .finally(() => {
          loading.hide();
        });
    },
    [alertContext, loading, createProductSpecify, routerHistory],
  );

  const handleBarcodeSubmit = React.useCallback(
    (_barcode: string) => {
      checkProduct({ barcode: _barcode }).then(({ hasBarcode }) => {
        setBarcodeSaved(hasBarcode);
        setBarcode(_barcode);
        setSkipProduct(!hasBarcode);
        if (hasBarcode) {
          alertContext.show('Urun sistemde bulundu. Devam Edebilirsiniz', {
            type: 'success',
          });
        } else {
          alertContext.show('Urun sistemde bulunamadi. Lutfen bilgileri doldurup devam edin', { type: 'success' });
        }
      });
    },
    [alertContext, checkProduct],
  );

  const handleProductSubmit = React.useCallback(
    (request: IProductRequest) => {
      if (isBarcodeSaved) {
        setProduct(productQuery);
      } else {
        createProduct(request).then(({ data }) => {
          setProduct(data);
        });
      }
      setIsProductComponent(false);
    },
    [createProduct, isBarcodeSaved, productQuery],
  );

  return (
    <Container>
      {isProductComponent && (
        <ProductFormComponent
          onBarcodeSubmit={handleBarcodeSubmit}
          isBarcodeSaved={isBarcodeSaved}
          onProductSubmit={handleProductSubmit}
          product={product || productQuery}
        />
      )}
      {!isProductComponent && (
        <ProductSpecifyFormComponent
          barcode={barcode}
          activeStates={applicationContext.user.activeStates}
          onSubmit={handleSpecifySubmit}
        />
      )}
    </Container>
  );
}
const PureCreateProductSpecifyPage = React.memo(CreateProductSpecifyPage);

export { PureCreateProductSpecifyPage as CreateProductSpecifyPage };
