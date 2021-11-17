import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@onlineplasiyer/op-web-fronted';

async function getProductSpecifyById(id: string) {
  return queryEndpoints.getProductSpecifyById({ id });
}

export const useGetProductSpecifyById = (id: string) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['product-by-id', id], () => getProductSpecifyById(id), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
