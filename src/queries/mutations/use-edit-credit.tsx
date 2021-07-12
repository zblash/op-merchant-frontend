import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';
import { IUserCreditResponse } from '@/utils/api/api-models';
import { useAlert } from '@/utils/hooks';

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
    },
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};
