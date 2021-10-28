import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';
import {
  IRegisterResponse,
  IRegisterRequest,
  IExceptionResponse,
} from '@/utils/api/api-models';
import { useAlert } from '@/utils/hooks';

async function register(input: IRegisterRequest) {
  return mutationEndPoints.merchantRegister(input);
}

export const useMerchantRegisterMutation = () => {
  const { t } = useTranslation();
  const alert = useAlert();

  return useMutation((input: IRegisterRequest) => register(input), {
    onSuccess: (data: IRegisterResponse) => {
      alert.show(`${t('forms:success')}`, {
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
