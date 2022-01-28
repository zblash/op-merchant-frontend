import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints, IExceptionResponse, IUserCreditResponse, useAlert } from '@zblash/op-web-fronted';

export interface SetCreditProps {
  creditId: string;
  totalDebt: number;
  creditLimit: number;
  customerId: string;
}
async function mutateCredit(input: SetCreditProps) {
  return mutationEndPoints.editUserCredit({
    creditId: input.creditId,
    totalDebt: input.totalDebt,
    creditLimit: input.creditLimit,
    customerId: input.customerId,
  });
}

export const useCreditMutation = () => {
  const { t } = useTranslation();
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation((input: SetCreditProps) => mutateCredit(input), {
    onSuccess: (data: IUserCreditResponse) => {
      queryClient.invalidateQueries('all-users-credits');
      alert.show(`${t('Krediler Başarıyla Güncellendi')}`, {
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
