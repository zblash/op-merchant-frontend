import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@zblash/op-web-fronted';

async function getObligationTotal() {
  return queryEndpoints.getObligationTotal();
}

export const useGetObligationTotal = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('obligation-total', () => getObligationTotal(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
