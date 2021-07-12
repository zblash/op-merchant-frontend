import * as React from 'react';
import { useParams, useHistory } from 'react-router';
import { Container } from '@/components/ui';
import { useQuery } from '@/services/query-context/context';
import { queryEndpoints } from '@/services/query-context/query-endpoints';
import { ProductSpecifyFormComponent } from '@/components/common/product-specify-form';
import { useAlert } from '@/utils/hooks';
import { useApplicationContext } from '@/app/context';
import { useMutation } from '@/services/mutation-context/context';
import { mutationEndPoints } from '@/services/mutation-context/mutation-enpoints';
import { refetchFactory } from '@/services/utils';
import { paginationQueryEndpoints } from '@/services/query-context/pagination-query-endpoints';
import { ISpecifyProductRequest } from '@/services/helpers/backend-models';
import { useLoadingContext } from '@/contexts/loading-context';

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
  const applicationContext = useApplicationContext();
  const loadingContext = useLoadingContext();
  const { data: productSpecify, loading, error } = useQuery(queryEndpoints.getProductSpecifyById, {
    defaultValue: {},
    variables: { id: specifyId },
  });
  const { mutation: updateProductSpecify } = useMutation(mutationEndPoints.updateSpecifyProduct, {
    refetchQueries: [refetchFactory(paginationQueryEndpoints.getAllSpecifies)],
  });

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
    <Container>
      {!loading && !error && (
        <ProductSpecifyFormComponent
          barcode={productSpecify.productBarcodeList[0]}
          activeStates={applicationContext.user.activeStates}
          onSubmit={handleSpecifySubmit}
          data={productSpecify}
        />
      )}
    </Container>
  );
}
const PureUpdateProductSpeciyPage = React.memo(UpdateProductSpeciyPage);

export { PureUpdateProductSpeciyPage as UpdateProductSpeciyPage };
