import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';

async function getProductByBarcode(barcode: string) {
  return queryEndpoints.getProductByBarcode({ barcode });
}

export const useGetProductByBarcode = (barcode: string, isEnabled: boolean) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['product-by-barcode', barcode], () => getProductByBarcode(barcode), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
    enabled: isEnabled,
  });
};
