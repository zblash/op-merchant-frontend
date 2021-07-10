import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '~/utils/api/query-endpoints';
import { useAlert } from '~/utils/hooks';

async function getOrderSummary() {
  return queryEndpoints.getOrderSummary();
}

export const useGetOrderSummary = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('order-summary', () => getOrderSummary(), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};
