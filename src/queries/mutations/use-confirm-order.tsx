import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints, IExceptionResponse, IOrder, IOrderConfirmItem, useAlert } from '@zblash/op-web-fronted';

export interface ConfirmOrderProps {
  id: string;
  items: IOrderConfirmItem[];
}

async function mutateConfirmOrder(input: ConfirmOrderProps) {
  return mutationEndPoints.orderConfirm(input);
}

export const useConfirmOrderMutation = () => {
  const { t } = useTranslation();
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation((input: ConfirmOrderProps) => mutateConfirmOrder(input), {
    onSuccess: (data: IOrder) => {
      queryClient.invalidateQueries('order-detail');
      alert.show(`${t('Sipariş Başarıyla Onaylandı')}`, {
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
