import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';

async function getAnnouncements() {
  return queryEndpoints.getAnnouncements();
}

export const useGetAnnouncements = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('announcements', () => getAnnouncements(), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};
