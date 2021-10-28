import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';
import { IExceptionResponse } from '@/utils/api/api-models';

async function getAllNotifications() {
  return queryEndpoints.getAllNotifications();
}

export const useGetAllNotifications = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('all-notifications', () => getAllNotifications(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
