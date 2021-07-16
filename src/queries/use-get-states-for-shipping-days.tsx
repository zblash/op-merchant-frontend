import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';

async function getStatesForShippingDays() {
  return queryEndpoints.getAllowedStateForShippingDays();
}

export const useGetStatesForShippingDays = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['states-for-shipping-days'], () => getStatesForShippingDays(), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
    staleTime: 300 * 60 * 1000,
  });
};
