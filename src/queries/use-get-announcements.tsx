import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';
import { IExceptionResponse } from '@/utils/api/api-models';

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
