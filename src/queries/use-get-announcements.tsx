import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@onlineplasiyer/op-web-fronted';

async function getAnnouncements() {
  return queryEndpoints.getAnnouncements();
}

export const useGetAnnouncements = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('announcements', () => getAnnouncements(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
