import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';
import { DaysOfWeek, IExceptionResponse, IShippingDaysResponse } from '@/utils/api/api-models';
import { useAlert } from '@/utils/hooks';

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
    },
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
