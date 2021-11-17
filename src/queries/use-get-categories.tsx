import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, GetCategoriesVariables, useAlert } from '@onlineplasiyer/op-web-fronted';

async function getCategories(input: GetCategoriesVariables) {
  return queryEndpoints.getCategories(input);
}

export const useGetCategories = (input: GetCategoriesVariables, isEnabled: boolean) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['categories', input.type], () => getCategories(input), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
    enabled: isEnabled,
  });
};
