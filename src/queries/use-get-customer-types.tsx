import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';

async function getCustomerTypes() {
  return queryEndpoints.getCustomerTypes();
}

export const useGetCustomerTypes = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('customer-types', () => getCustomerTypes(), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};
