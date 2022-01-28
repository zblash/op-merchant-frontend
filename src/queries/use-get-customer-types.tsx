import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@zblash/op-web-fronted';

async function getCustomerTypes() {
  return queryEndpoints.getCustomerTypes();
}

export const useGetCustomerTypes = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('customer-types', () => getCustomerTypes(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
