import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@onlineplasiyer/op-web-fronted';

async function getCredit() {
  return queryEndpoints.getCredit();
}

export const useGetCredit = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('credit', () => getCredit(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
