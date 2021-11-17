import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@onlineplasiyer/op-web-fronted';

async function getOrderSummary() {
  return queryEndpoints.getOrderSummary();
}

export const useGetOrderSummary = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('order-summary', () => getOrderSummary(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
