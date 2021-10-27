import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';
import { IOrder, CreditPaymentType, TOrderStatus, IExceptionResponse } from '@/utils/api/api-models';
import { useAlert } from '@/utils/hooks';

export interface ConfirmOrderProps {
  id: string;
  paidPrice?: number;
  status: TOrderStatus;
  paymentType?: CreditPaymentType;
  waybillDate?: string;
}

async function mutateConfirmOrder(input: ConfirmOrderProps) {
  return mutationEndPoints.updateOrder(input);
}

export const useConfirmOrderMutation = () => {
  const { t } = useTranslation();
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation((input: ConfirmOrderProps) => mutateConfirmOrder(input), {
    onSuccess: (data: IOrder) => {
      queryClient.invalidateQueries('order-detail');
    },
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
