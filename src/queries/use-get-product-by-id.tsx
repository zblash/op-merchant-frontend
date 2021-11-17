import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@onlineplasiyer/op-web-fronted';

async function getProductById(id: string) {
  return queryEndpoints.getProductById({ id });
}

export const useGetProductById = (productId: string) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['product-by-id', productId], () => getProductById(productId), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
