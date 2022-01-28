import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@zblash/op-web-fronted';

async function getCategoryById(id: string) {
  return queryEndpoints.getCategoryByID({ id });
}

export const useGetCategoryById = (categoryId: string) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['category-by-id', categoryId], () => getCategoryById(categoryId), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
