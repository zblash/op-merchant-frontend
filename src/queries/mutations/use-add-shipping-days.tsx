import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import {
  mutationEndPoints,
  DaysOfWeek,
  IExceptionResponse,
  IShippingDaysResponse,
  useAlert,
} from '@zblash/op-web-fronted';

async function addShippingDays(s: { stateId: string; days: DaysOfWeek[] }) {
  return mutationEndPoints.createShippingDays(s);
}

export const useAddShippingDays = () => {
  const { t } = useTranslation();
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation((s: { stateId: string; days: DaysOfWeek[] }) => addShippingDays(s), {
    onSuccess: (data: IShippingDaysResponse) => {
      queryClient.invalidateQueries('shipping-days');
      alert.show(`${t('Teslimat Tarihi Ekleme Işlemi Başarılı')}`, {
        type: 'success',
      });
    },
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
