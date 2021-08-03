import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';

async function getStatesByCity(cityId: string) {
  return queryEndpoints.getStatesByCityId({ cityId });
}

export const useGetStatesByCity = (cityId: string, isEnabled: boolean) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['states', cityId], () => getStatesByCity(cityId), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
    enabled: isEnabled,
  });
};
