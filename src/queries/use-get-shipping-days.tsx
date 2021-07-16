import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';

async function getShippingDays() {
  return queryEndpoints.getShippingDays();
}

export const useGetShippingDays = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('shipping-days', () => getShippingDays(), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};
