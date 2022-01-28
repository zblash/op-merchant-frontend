import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@zblash/op-web-fronted';

async function getAuthUserActiveStates() {
  return queryEndpoints.getAuthUserActiveStates();
}

export const useGetAuthUserActiveStates = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery('auth-active-states', () => getAuthUserActiveStates(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
