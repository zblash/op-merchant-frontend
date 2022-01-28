import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@zblash/op-web-fronted';

async function getAllUsersNotifications() {
  return queryEndpoints.getAllUsersNotifications();
}

export const useGetAllUsersNotifications = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('all-users-notifications', () => getAllUsersNotifications(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
