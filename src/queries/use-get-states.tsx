import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@onlineplasiyer/op-web-fronted';

async function getStates() {
  return queryEndpoints.getStates();
}

export const useGetStates = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('states', () => getStates(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
