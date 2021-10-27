import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';
import { IExceptionResponse } from '@/utils/api/api-models';

async function getStatesByCity(cityId: string) {
  return queryEndpoints.getStatesByCityId({ cityId });
}

export const useGetStatesByCity = (cityId: string, isEnabled: boolean) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['states', cityId], () => getStatesByCity(cityId), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
    enabled: isEnabled,
  });
};
