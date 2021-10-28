import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';
import { IExceptionResponse } from '@/utils/api/api-models';

async function getProductById(id: string) {
  return queryEndpoints.getProductById({ id });
}

export const useGetProductById = (productId: string) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['product-by-id', productId], () => getProductById(productId), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
