import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';

async function getOrder(id: string) {
  return queryEndpoints.getOrder({ id });
}

export const useGetOrder = (id: string) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['order-detail', id], () => getOrder(id), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};
