import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';
import { IExceptionResponse, IOrder, IOrderConfirmItem } from '@/utils/api/api-models';
import { useAlert } from '@/utils/hooks';

export interface OrderConfirmProps {
  id: string;
  items: IOrderConfirmItem[];
}

async function mutateOrderConfirm(input: OrderConfirmProps) {
  return mutationEndPoints.orderConfirm(input);
}

export const useOrderConfirmMutation = () => {
  const { t } = useTranslation();
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation((input: OrderConfirmProps) => mutateOrderConfirm(input), {
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
