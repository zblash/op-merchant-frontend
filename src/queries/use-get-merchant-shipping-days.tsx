import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@zblash/op-web-fronted';

async function getMerchantShippingDays(merchantId: string) {
  return queryEndpoints.getMerchantShippingDays({ merchantId });
}

export const useGetMerchantShippingDays = (merchantId: string) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['merchant-shipping-days', merchantId], () => getMerchantShippingDays(merchantId), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
