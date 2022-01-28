import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@zblash/op-web-fronted';

async function getSubCategoriesByParent(parentId: string) {
  return queryEndpoints.getSubCategoriesByParentId({ parentId });
}

export const useGetSubCategoriesByParent = (parentId: string, isEnabled: boolean) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['categories-by-parent', parentId], () => getSubCategoriesByParent(parentId), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
    enabled: isEnabled,
  });
};
