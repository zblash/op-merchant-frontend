import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';
import { IExceptionResponse } from '@/utils/api/api-models';

async function getProductSpecifyById(id: string) {
  return queryEndpoints.getProductSpecifyById({ id });
}

export const useGetProductSpecifyById = (id: string) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['product-by-id', id], () => getProductSpecifyById(id), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
