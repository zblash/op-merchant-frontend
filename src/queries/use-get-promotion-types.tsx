import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@zblash/op-web-fronted';

async function getPromotionTypes() {
  return queryEndpoints.getPromotionTypes();
}

export const useGetPromotionTypes = (isEnabled: boolean) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['promotion-types'], () => getPromotionTypes(), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
    enabled: isEnabled,
  });
};
