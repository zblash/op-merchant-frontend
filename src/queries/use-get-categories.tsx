import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';
import { GetCategoriesVariables } from '@/utils/api/paginated-query-endpoints';

async function getCategories(input: GetCategoriesVariables) {
  return queryEndpoints.getCategories(input);
}

export const useGetCategories = (input: GetCategoriesVariables, isEnabled: boolean) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['categories', input.type], () => getCategories(input), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
    enabled: isEnabled,
  });
};
