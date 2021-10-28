import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';
import { IOrder, CreditPaymentType, TOrderStatus, IExceptionResponse } from '@/utils/api/api-models';
import { useAlert } from '@/utils/hooks';

export interface UpdateOrderProps {
  id: string;
  paidPrice?: number;
  status: TOrderStatus;
  paymentType?: CreditPaymentType;
  waybillDate?: string;
}

async function mutateUpdateOrder(input: UpdateOrderProps) {
  return mutationEndPoints.updateOrder(input);
}

export const useUpdateOrderMutation = () => {
  const { t } = useTranslation();
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation((input: UpdateOrderProps) => mutateUpdateOrder(input), {
    onSuccess: (data: IOrder) => {
      queryClient.invalidateQueries('all-orders');
      alert.show(`${t('Sipariş Başarıyla Güncellendi')}`, {
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
