import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '~/utils/api/query-endpoints';
import { useAlert } from '~/utils/hooks';

async function getCustomers() {
  return queryEndpoints.getCustomers();
}

export const useGetCustomers = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('customers', () => getCustomers(), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};
