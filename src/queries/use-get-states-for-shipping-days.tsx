import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@onlineplasiyer/op-web-fronted';

async function getStatesForShippingDays() {
  return queryEndpoints.getAllowedStateForShippingDays();
}

export const useGetStatesForShippingDays = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['states-for-shipping-days'], () => getStatesForShippingDays(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
    staleTime: 300 * 60 * 1000,
  });
};
