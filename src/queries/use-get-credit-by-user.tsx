import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';

async function getCreditByUser(userId: string) {
  return queryEndpoints.getUsersCreditByUser({ userId });
}

export const useGetCreditByUser = (userId: string) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('credit-by-user', () => getCreditByUser(userId), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};
