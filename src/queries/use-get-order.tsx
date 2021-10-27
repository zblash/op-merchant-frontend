import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';
import { IExceptionResponse } from '@/utils/api/api-models';

async function getOrder(id: string) {
  return queryEndpoints.getOrder({ id });
}

export const useGetOrder = (id: string) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['order-detail', id], () => getOrder(id), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
