import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';
import { IRegisterResponse, IRegisterRequest } from '@/utils/api/api-models';
import { useAlert } from '@/utils/hooks';

async function register(input: IRegisterRequest) {
  return mutationEndPoints.register(input);
}

export const useRegisterMutation = () => {
  const { t } = useTranslation();
  const alert = useAlert();

  return useMutation((input: IRegisterRequest) => register(input), {
    onSuccess: (data: IRegisterResponse) => {
      alert.show(`${t('forms:success')}`, {
        type: 'success',
      });
    },
    onError: () => {
      alert.show(`${t('forms:register-error')}`, {
        type: 'error',
      });
    },
  });
};
