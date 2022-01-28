import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@zblash/op-web-fronted';

async function getProductsByFilter(name: string) {
  return queryEndpoints.getProductsByFilter({ name });
}

export const useGetProductsByFilter = (name: string) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['products-by-filter', name], () => getProductsByFilter(name), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
