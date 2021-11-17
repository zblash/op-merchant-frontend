import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@onlineplasiyer/op-web-fronted';

async function getParentCategories() {
  return queryEndpoints.getParentCategories();
}

export const useGetParentCategories = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('parent-categories', () => getParentCategories(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
