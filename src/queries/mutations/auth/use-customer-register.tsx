import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';
import { IRegisterResponse, IExceptionResponse, ICustomerRegisterRequest } from '@/utils/api/api-models';
import { useAlert } from '@/utils/hooks';

async function register(input: ICustomerRegisterRequest) {
  return mutationEndPoints.customerRegister(input);
}

export const useCustomerRegisterMutation = () => {
  const { t } = useTranslation();
  const alert = useAlert();

  return useMutation((input: ICustomerRegisterRequest) => register(input), {
    onSuccess: (data: IRegisterResponse) => {
      alert.show(`${t('Kayıt Işlemi Başarılı')}`, {
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
