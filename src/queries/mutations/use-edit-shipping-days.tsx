import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';
import { DaysOfWeek, IExceptionResponse, IShippingDaysResponse } from '@/utils/api/api-models';
import { useAlert } from '@/utils/hooks';

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
    },
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
