import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';
import { IExceptionResponse } from '@/utils/api/api-models';

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
