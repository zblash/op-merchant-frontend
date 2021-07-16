import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';

async function getAllProductsByUser() {
  return queryEndpoints.getAllProducts();
}

export const useGetAllProductsByUser = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('all-products-by-user', () => getAllProductsByUser(), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};
