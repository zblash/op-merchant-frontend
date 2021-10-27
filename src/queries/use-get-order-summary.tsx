import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';
import { IExceptionResponse } from '@/utils/api/api-models';

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
