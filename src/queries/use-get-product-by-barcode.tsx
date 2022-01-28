import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@zblash/op-web-fronted';

async function getProductByBarcode(barcode: string) {
  return queryEndpoints.getProductByBarcode({ barcode });
}

export const useGetProductByBarcode = (barcode: string, isEnabled: boolean) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['product-by-barcode', barcode], () => getProductByBarcode(barcode), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
    enabled: isEnabled,
  });
};
