import * as React from 'react';
import { useParams, useHistory } from 'react-router';
import { UIContainer } from '@/components/ui';
import { ProductSpecifyFormComponent } from '@/components/page-components/product-specify-form';
import { useAlert } from '@/utils/hooks';
import { useLoadingContext } from '@/contexts/loading-context';
import { useGetProductSpecifyById } from '@/queries/use-get-product-specify-by-id';
import { useEditProductSpecify } from '@/queries/mutations/use-edit-product-specify';
import { ISpecifyProductRequest } from '@/utils/api/api-models';
import { useAuth } from '@/contexts/auth-context';
import { useGetPromotionTypes } from '@/queries/use-get-promotion-types';
import { useGetDiscountTypes } from '@/queries/use-get-discount-types';

/* UpdateProductSpeciyPage Helpers */
interface UpdateProductSpeciyPageProps {}
interface RouteParams {
  specifyId: string;
}
/* UpdateProductSpeciyPage Constants */

/* UpdateProductSpeciyPage Styles */

/* UpdateProductSpeciyPage Component  */
function UpdateProductSpeciyPage(props: React.PropsWithChildren<UpdateProductSpeciyPageProps>) {
  /* UpdateProductSpeciyPage Variables */
  const { specifyId } = useParams<RouteParams>();
  const alertContext = useAlert();
  const routerHistory = useHistory();
  const { userDetails } = useAuth();
  const loadingContext = useLoadingContext();

  const { data: productSpecify, isLoading: loading, error } = useGetProductSpecifyById(specifyId);
  const { mutateAsync: updateProductSpecify } = useEditProductSpecify();

  const { data: promotionTypes } = useGetPromotionTypes(true);
  const { data: discountTypes } = useGetDiscountTypes(true);

  /* UpdateProductSpeciyPage Callbacks */
  const handleSpecifySubmit = React.useCallback(
    (request: ISpecifyProductRequest) => {
      loadingContext.show();
      updateProductSpecify({ id: specifyId, request })
        .then(() => {
          alertContext.show('Urun Basariyla Guncellendi', { type: 'success' });
          routerHistory.push('/product-specifies');
        })
        .catch(() => {
          alertContext.show('Lutfen Tum Alanlari Doldurun', { type: 'error' });
        })
        .finally(() => {
          loadingContext.hide();
        });
    },
    [updateProductSpecify, specifyId, alertContext, routerHistory, loadingContext],
  );

  /* UpdateProductSpeciyPage Lifecycle  */

  return (
    <UIContainer>
      {!loading && !error && discountTypes && promotionTypes && (
        <ProductSpecifyFormComponent
          barcode={productSpecify.productBarcodeList[0]}
          activeStates={userDetails.activeStates}
          onSubmit={handleSpecifySubmit}
          customerTypes={productSpecify.customerTypeList}
          data={productSpecify}
          discountTypes={discountTypes}
          promotionTypes={promotionTypes}
        />
      )}
    </UIContainer>
  );
}
const PureUpdateProductSpeciyPage = React.memo(UpdateProductSpeciyPage);

export { PureUpdateProductSpeciyPage as UpdateProductSpeciyPage };
