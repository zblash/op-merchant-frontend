import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import {
  mutationEndPoints,
  DaysOfWeek,
  IExceptionResponse,
  IShippingDaysResponse,
  useAlert,
} from '@onlineplasiyer/op-web-fronted';

async function editShippingDays(s: { shippingDaysId: string; days: DaysOfWeek[] }) {
  return mutationEndPoints.updateShippingDays(s);
}

export const useEditShippingDays = () => {
  const { t } = useTranslation();
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation((s: { shippingDaysId: string; days: DaysOfWeek[] }) => editShippingDays(s), {
    onSuccess: (data: IShippingDaysResponse) => {
      queryClient.invalidateQueries('shipping-days');
      alert.show(`${t('Teslimat Tarihi Güncelleme Işlemi Başarılı')}`, {
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
