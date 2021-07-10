import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '~/utils/api/query-endpoints';
import { useAlert } from '~/utils/hooks';

async function getObligationTotal() {
  return queryEndpoints.getObligationTotal();
}

export const useGetObligationTotal = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('obligation-total', () => getObligationTotal(), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};
