import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';

async function getUserInfos() {
  return queryEndpoints.getUserInfos();
}

export const useGetUserInfos = (isEnabled: boolean) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('user-infos', () => getUserInfos(), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
    enabled: isEnabled,
  });
};
