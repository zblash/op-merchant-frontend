import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';

async function getSubCategoriesByParent(parentId: string) {
  return queryEndpoints.getSubCategoriesByParentId({ parentId });
}

export const useGetSubCategoriesByParent = (parentId: string, isEnabled: boolean) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['categories-by-parent', parentId], () => getSubCategoriesByParent(parentId), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
    enabled: isEnabled,
  });
};
