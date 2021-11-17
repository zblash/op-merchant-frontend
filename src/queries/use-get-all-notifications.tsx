import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@onlineplasiyer/op-web-fronted';

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
