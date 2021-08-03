import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';

async function getCities() {
  return queryEndpoints.getCities();
}

export const useGetCities = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['cities'], () => getCities(), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};
